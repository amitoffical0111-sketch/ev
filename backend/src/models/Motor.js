const mongoose = require('mongoose');

const motorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  power: { type: String, required: true },
  torque: String,
  efficiency: String,
  coolingType: String,
  controllerType: String,
  warranty: String,
  weight: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Motor', motorSchema);