const express = require('express');
const router = express.Router();
const { getSettings, updateSettings, getSetting } = require('../controllers/settingsController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getSettings);
router.get('/:key', getSetting);
router.put('/', protect, authorize('admin'), updateSettings);

module.exports = router;
