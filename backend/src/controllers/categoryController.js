const categoryService = require('../services/categoryService');
const ApiResponse = require('../utils/apiResponse');

class CategoryController {
  async getCategories(req, res, next) {
    try {
      const asTree = req.query.tree === 'true';
      const categories = await categoryService.getCategories(asTree);
      return ApiResponse.success(res, categories, 'Categories fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async getCategoryBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const category = await categoryService.getCategoryBySlug(slug);
      return ApiResponse.success(res, category, 'Category fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async createCategory(req, res, next) {
    try {
      const category = await categoryService.createCategory(req.body);
      return ApiResponse.created(res, category, 'Category created successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();

