const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validate = require('../middlewares/validate');
const {
  listProductQueryValidator,
  createProductValidator,
  productIdOrSlugValidator
} = require('../validators/productValidators');

// GET /api/v1/products - Advanced filtering, searching, indexing, pagination
router.get('/', validate(listProductQueryValidator), productController.getProducts);

// GET /api/v1/products/facets - Dynamic aggregated facets for filters
router.get('/facets', productController.getFacets);

// GET /api/v1/products/:idOrSlug - Single product with related items
router.get('/:idOrSlug', validate(productIdOrSlugValidator), productController.getProductByIdOrSlug);

// POST /api/v1/products - Create product
router.post('/', validate(createProductValidator), productController.createProduct);

// PUT /api/v1/products/:id - Update product
router.put('/:id', productController.updateProduct);

// DELETE /api/v1/products/:id - Soft delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;

