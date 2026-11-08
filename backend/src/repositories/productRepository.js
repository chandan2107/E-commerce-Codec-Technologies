const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

class ProductRepository {
  /**
   * Build MongoDB match filter from validated query params
   */
  async buildFilter(params) {
    const filter = { isActive: true };

    // 1. Text Search (Leverages MongoDB Text Index)
    if (params.search && params.search.trim()) {
      filter.$text = { $search: params.search.trim() };
    }

    // 2. Category filtering with sub-tree inheritance
    if (params.category) {
      let targetCategoryId = null;

      if (mongoose.Types.ObjectId.isValid(params.category)) {
        targetCategoryId = new mongoose.Types.ObjectId(params.category);
      } else {
        const cat = await Category.findOne({ slug: params.category }).select('_id');
        if (cat) targetCategoryId = cat._id;
      }

      if (targetCategoryId) {
        // Query products matching category or where category is in ancestor categoryPath
        filter.$or = [
          { category: targetCategoryId },
          { categoryPath: targetCategoryId }
        ];
      }
    }

    // 3. Brand filtering (supports single or comma-separated list)
    if (params.brand) {
      const brands = params.brand.split(',').map((b) => b.trim()).filter(Boolean);
      if (brands.length === 1) {
        filter.brand = { $regex: new RegExp(`^${brands[0]}$`, 'i') };
      } else if (brands.length > 1) {
        filter.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, 'i')) };
      }
    }

    // 4. Price range
    if (params.minPrice !== undefined || params.maxPrice !== undefined) {
      filter.price = {};
      if (params.minPrice !== undefined) filter.price.$gte = params.minPrice;
      if (params.maxPrice !== undefined) filter.price.$lte = params.maxPrice;
    }

    // 5. Rating filter
    if (params.minRating !== undefined && params.minRating > 0) {
      filter['ratings.average'] = { $gte: params.minRating };
    }

    // 6. In-Stock filter
    if (params.inStock === true) {
      filter['inventory.isAvailable'] = true;
      filter['inventory.stockQuantity'] = { $gt: 0 };
    }

    // 7. Featured flag
    if (params.featured === true) {
      filter.featured = true;
    }

    return filter;
  }

  /**
   * Determine sort object
   */
  getSortCriteria(sortKey, hasSearch = false) {
    // If text search is active and no explicit sort, sort by text score relevance
    if (hasSearch && (!sortKey || sortKey === 'relevance')) {
      return { score: { $meta: 'textScore' } };
    }

    switch (sortKey) {
      case 'price-asc':
        return { price: 1, _id: 1 };
      case 'price-desc':
        return { price: -1, _id: 1 };
      case 'rating-desc':
        return { 'ratings.average': -1, 'ratings.count': -1 };
      case 'popular':
        return { 'ratings.count': -1, featured: -1, _id: 1 };
      case 'title-asc':
        return { name: 1, _id: 1 };
      case 'newest':
      default:
        return { createdAt: -1, _id: 1 };
    }
  }

  /**
   * Find products with pagination, sorting and index utilization
   */
  async findPaginated(params) {
    const startTime = Date.now();
    const filter = await this.buildFilter(params);
    const page = Math.max(1, parseInt(params.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(params.limit, 10) || 12));
    const skip = (page - 1) * limit;

    const hasSearch = Boolean(params.search && params.search.trim());
    const sort = this.getSortCriteria(params.sort, hasSearch);

    // Build query projection
    const projection = hasSearch ? { score: { $meta: 'textScore' } } : {};

    // Execute count and product query in parallel
    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter, projection)
        .populate('category', 'name slug ancestors')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
    ]);

    const executionTimeMs = Date.now() - startTime;
    const totalPages = Math.ceil(totalProducts / limit) || 1;

    return {
      products,
      pagination: {
        page,
        limit,
        totalProducts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      executionTimeMs
    };
  }

  /**
   * Aggregation pipeline to compute dynamic filter facets (brands, categories, price stats)
   */
  async getFacets(params = {}) {
    // Global or base active filter
    const baseFilter = { isActive: true };

    const facetPipeline = [
      { $match: baseFilter },
      {
        $facet: {
          priceStats: [
            {
              $group: {
                _id: null,
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                avgPrice: { $avg: '$price' }
              }
            }
          ],
          brands: [
            { $group: { _id: '$brand', count: { $sum: 1 } } },
            { $sort: { count: -1, _id: 1 } },
            { $limit: 25 },
            { $project: { _id: 0, name: '$_id', count: 1 } }
          ],
          categoryCounts: [
            { $group: { _id: '$category', count: { $sum: 1 } } },
            {
              $lookup: {
                from: 'categories',
                localField: '_id',
                foreignField: '_id',
                as: 'categoryDetails'
              }
            },
            { $unwind: '$categoryDetails' },
            {
              $project: {
                _id: '$_id',
                name: '$categoryDetails.name',
                slug: '$categoryDetails.slug',
                parent: '$categoryDetails.parent',
                count: 1
              }
            },
            { $sort: { count: -1 } }
          ],
          availability: [
            {
              $group: {
                _id: '$inventory.isAvailable',
                count: { $sum: 1 }
              }
            }
          ]
        }
      }
    ];

    const [facetResults] = await Product.aggregate(facetPipeline);

    const priceInfo = facetResults.priceStats[0] || { minPrice: 0, maxPrice: 1000, avgPrice: 0 };
    const inStockCount = (facetResults.availability.find((a) => a._id === true) || {}).count || 0;
    const outOfStockCount = (facetResults.availability.find((a) => a._id === false) || {}).count || 0;

    return {
      priceRange: {
        min: Math.floor(priceInfo.minPrice || 0),
        max: Math.ceil(priceInfo.maxPrice || 1000),
        avg: Math.round(priceInfo.avgPrice || 0)
      },
      brands: facetResults.brands || [],
      categories: facetResults.categoryCounts || [],
      availability: {
        inStock: inStockCount,
        outOfStock: outOfStockCount
      }
    };
  }

  async findByIdOrSlug(idOrSlug) {
    const isId = mongoose.Types.ObjectId.isValid(idOrSlug);
    const query = isId ? { _id: idOrSlug } : { slug: idOrSlug.toLowerCase() };

    return Product.findOne(query)
      .populate('category', 'name slug ancestors')
      .lean();
  }

  async findRelated(productId, categoryId, tags = [], limit = 4) {
    const filter = {
      _id: { $ne: productId },
      isActive: true,
      $or: [
        { category: categoryId },
        { tags: { $in: tags } }
      ]
    };

    return Product.find(filter)
      .populate('category', 'name slug')
      .sort({ 'ratings.average': -1, createdAt: -1 })
      .limit(limit)
      .lean();
  }

  async create(data) {
    const product = new Product(data);
    return product.save();
  }

  async update(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  }

  async delete(id) {
    return Product.findByIdAndUpdate(id, { isActive: false }, { new: true }).lean();
  }
}

module.exports = new ProductRepository();

