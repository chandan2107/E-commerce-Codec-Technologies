const { body, param } = require('express-validator');

const createCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ max: 100 })
    .trim(),
  body('slug')
    .optional()
    .isSlug()
    .withMessage('Slug must be a valid URL-friendly string')
    .trim(),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .trim(),
  body('parent')
    .optional({ nullable: true })
    .isMongoId()
    .withMessage('Parent category must be a valid ID')
];

const categorySlugValidator = [
  param('slug')
    .notEmpty()
    .withMessage('Category slug is required')
    .trim()
];

module.exports = {
  createCategoryValidator,
  categorySlugValidator
};

