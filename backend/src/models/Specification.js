const mongoose = require('mongoose');

const specificationSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
  category: { type: String, default: 'General' },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Specification', specificationSchema);