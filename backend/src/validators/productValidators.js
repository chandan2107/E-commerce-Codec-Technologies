const { query, body, param } = require('express-validator');

const listProductQueryValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be an integer between 1 and 100')
    .toInt(),
  query('search')
    .optional()
    .isString()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Search query too long'),
  query('category')
    .optional()
    .isString()
    .trim(),
  query('brand')
    .optional()
    .isString()
    .trim(),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('minPrice must be a number >= 0')
    .toFloat(),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('maxPrice must be a number >= 0')
    .toFloat(),
  query('minRating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('minRating must be between 0 and 5')
    .toFloat(),
  query('inStock')
    .optional()
    .isBoolean()
    .withMessage('inStock must be true or false')
    .toBoolean(),
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('featured must be true or false')
    .toBoolean(),
  query('sort')
    .optional()
    .isIn(['newest', 'price-asc', 'price-desc', 'rating-desc', 'popular', 'title-asc'])
    .withMessage('Invalid sort parameter')
];

const createProductValidator = [
  body('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 200 })
    .trim(),
  body('sku')
    .notEmpty()
    .withMessage('SKU is required')
    .trim()
    .toUpperCase(),
  body('brand')
    .notEmpty()
    .withMessage('Brand is required')
    .trim(),
  body('category')
    .notEmpty()
    .withMessage('Category ID is required')
    .isMongoId()
    .withMessage('Invalid category ID'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim(),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('compareAtPrice')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Compare-at price must be a positive number'),
  body('inventory.stockQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be non-negative'),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array')
];

const productIdOrSlugValidator = [
  param('idOrSlug')
    .notEmpty()
    .withMessage('Product identifier is required')
    .trim()
];

module.exports = {
  listProductQueryValidator,
  createProductValidator,
  productIdOrSlugValidator
};

