const Category = require('../models/Category');

class CategoryRepository {
  async findAllActive() {
    return Category.find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 })
      .lean();
  }

  async findTree() {
    // Fetch all active categories
    const categories = await Category.find({ isActive: true })
      .sort({ displayOrder: 1, name: 1 })
      .lean();

    // Build hierarchy tree
    const categoryMap = new Map();
    const rootCategories = [];

    categories.forEach((cat) => {
      categoryMap.set(cat._id.toString(), { ...cat, children: [] });
    });

    categories.forEach((cat) => {
      const node = categoryMap.get(cat._id.toString());
      if (cat.parent) {
        const parentNode = categoryMap.get(cat.parent.toString());
        if (parentNode) {
          parentNode.children.push(node);
        } else {
          rootCategories.push(node);
        }
      } else {
        rootCategories.push(node);
      }
    });

    return rootCategories;
  }

  async findBySlug(slug) {
    return Category.findOne({ slug, isActive: true })
      .populate('parent', 'name slug')
      .lean();
  }

  async findById(id) {
    return Category.findById(id).populate('parent', 'name slug').lean();
  }

  async create(categoryData) {
    let ancestors = [];
    if (categoryData.parent) {
      const parent = await Category.findById(categoryData.parent);
      if (parent) {
        ancestors = [
          ...parent.ancestors,
          { _id: parent._id, name: parent.name, slug: parent.slug }
        ];
      }
    }

    const category = new Category({
      ...categoryData,
      ancestors
    });

    return category.save();
  }
}

module.exports = new CategoryRepository();

