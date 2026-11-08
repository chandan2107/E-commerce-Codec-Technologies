const productService = require('../services/productService');
const ApiResponse = require('../utils/apiResponse');

class ProductController {
  async getProducts(req, res, next) {
    try {
      const result = await productService.getProducts(req.query);
      return ApiResponse.success(
        res,
        result.products,
        'Products fetched successfully',
        200,
        {
          pagination: result.pagination,
          executionTimeMs: result.executionTimeMs
        }
      );
    } catch (error) {
      next(error);
    }
  }

  async getFacets(req, res, next) {
    try {
      const facets = await productService.getFacets(req.query);
      return ApiResponse.success(res, facets, 'Catalog facets fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async getProductByIdOrSlug(req, res, next) {
    try {
      const { idOrSlug } = req.params;
      const data = await productService.getProductByIdOrSlug(idOrSlug);
      return ApiResponse.success(res, data, 'Product details fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const product = await productService.createProduct(req.body);
      return ApiResponse.created(res, product, 'Product created successfully');
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const product = await productService.updateProduct(req.params.id, req.body);
      return ApiResponse.success(res, product, 'Product updated successfully');
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const product = await productService.deleteProduct(req.params.id);
      return ApiResponse.success(res, product, 'Product deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductController();

