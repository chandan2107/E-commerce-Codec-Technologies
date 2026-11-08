const productRepository = require('../repositories/productRepository');
const categoryRepository = require('../repositories/categoryRepository');
const ApiError = require('../utils/apiError');

class ProductService {
  async getProducts(queryParams) {
    return productRepository.findPaginated(queryParams);
  }

  async getFacets(queryParams) {
    return productRepository.getFacets(queryParams);
  }

  async getProductByIdOrSlug(idOrSlug) {
    const product = await productRepository.findByIdOrSlug(idOrSlug);
    if (!product) {
      throw ApiError.notFound(`Product not found with identifier: ${idOrSlug}`);
    }

    const categoryId = product.category?._id || product.category;
    const relatedProducts = await productRepository.findRelated(
      product._id,
      categoryId,
      product.tags || [],
      4
    );

    return {
      product,
      relatedProducts
    };
  }

  async createProduct(productData) {
    // Generate slug if omitted
    if (!productData.slug) {
      productData.slug = productData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '') + '-' + Math.random().toString(36).substring(2, 6);
    }

    // Build categoryPath from ancestors for fast hierarchical indexing
    if (productData.category) {
      const category = await categoryRepository.findById(productData.category);
      if (category) {
        const ancestorIds = (category.ancestors || []).map((a) => a._id);
        productData.categoryPath = [...ancestorIds, category._id];
      }
    }

    return productRepository.create(productData);
  }

  async updateProduct(id, productData) {
    if (productData.category) {
      const category = await categoryRepository.findById(productData.category);
      if (category) {
        const ancestorIds = (category.ancestors || []).map((a) => a._id);
        productData.categoryPath = [...ancestorIds, category._id];
      }
    }

    const updated = await productRepository.update(id, productData);
    if (!updated) {
      throw ApiError.notFound(`Product with ID ${id} not found`);
    }
    return updated;
  }

  async deleteProduct(id) {
    const deleted = await productRepository.delete(id);
    if (!deleted) {
      throw ApiError.notFound(`Product with ID ${id} not found`);
    }
    return deleted;
  }
}

module.exports = new ProductService();

