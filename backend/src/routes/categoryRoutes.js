const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validate = require('../middlewares/validate');
const {
  createCategoryValidator,
  categorySlugValidator
} = require('../validators/categoryValidators');

// GET /api/v1/categories - Get categories (supports ?tree=true)
router.get('/', categoryController.getCategories);

// GET /api/v1/categories/:slug - Get single category details
router.get('/:slug', validate(categorySlugValidator), categoryController.getCategoryBySlug);

// POST /api/v1/categories - Create category
router.post('/', validate(createCategoryValidator), categoryController.createCategory);

module.exports = router;

