const express = require('express');
const router = express.Router();
const {
  getProducts, getProduct, getFeaturedProducts, createProduct,
  updateProduct, deleteProduct, duplicateProduct, compareProducts,
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.post('/compare', compareProducts);
router.get('/:slug', getProduct);
router.post('/', protect, authorize('admin'), upload.array('images', 10), createProduct);
router.put('/:id', protect, authorize('admin'), upload.array('images', 10), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);
router.post('/:id/duplicate', protect, authorize('admin'), duplicateProduct);

module.exports = router;
