const express = require('express');
const router = express.Router();
const { createBooking, getBookings, getBooking, updateBookingStatus, getBookingStats } = require('../controllers/bookingController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', createBooking);
router.get('/', protect, authorize('admin', 'dealer'), getBookings);
router.get('/stats', protect, authorize('admin'), getBookingStats);
router.get('/:id', protect, getBooking);
router.put('/:id/status', protect, authorize('admin', 'dealer'), updateBookingStatus);

module.exports = router;
