const mongoose = require('mongoose');

const batterySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  capacity: { type: String, required: true },
  voltage: String,
  chargingTime: String,
  cycleLife: String,
  warranty: String,
  weight: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Battery', batterySchema);