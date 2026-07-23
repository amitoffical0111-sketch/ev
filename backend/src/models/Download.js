const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  file: { type: String, required: true },
  fileSize: String,
  category: { type: String, default: 'General' },
  icon: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  downloadCount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Download', downloadSchema);