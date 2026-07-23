const express = require('express');
const router = express.Router();
const { getDealers, getNearbyDealers, getDealer, createDealer, updateDealer, deleteDealer, applyDealer } = require('../controllers/dealerController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getDealers);
router.get('/nearby', getNearbyDealers);
router.post('/apply', applyDealer);
router.get('/:id', getDealer);
router.post('/', protect, authorize('admin'), createDealer);
router.put('/:id', protect, authorize('admin'), updateDealer);
router.delete('/:id', protect, authorize('admin'), deleteDealer);

module.exports = router;
