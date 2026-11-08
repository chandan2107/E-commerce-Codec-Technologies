const categoryRepository = require('../repositories/categoryRepository');
const ApiError = require('../utils/apiError');

class CategoryService {
  async getCategories(tree = false) {
    if (tree) {
      return categoryRepository.findTree();
    }
    return categoryRepository.findAllActive();
  }

  async getCategoryBySlug(slug) {
    const category = await categoryRepository.findBySlug(slug);
    if (!category) {
      throw ApiError.notFound(`Category with slug '${slug}' not found`);
    }
    return category;
  }

  async createCategory(data) {
    if (!data.slug) {
      data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }
    return categoryRepository.create(data);
  }
}

module.exports = new CategoryService();

