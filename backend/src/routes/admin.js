const express = require('express');
const router = express.Router();
const { getDashboardStats, getAnalytics } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('admin'));
router.get('/dashboard', getDashboardStats);
router.get('/analytics', getAnalytics);

module.exports = router;
