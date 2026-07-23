const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: String,
  page: { type: mongoose.Schema.Types.ObjectId, ref: 'Page' },
  icon: String,
  target: { type: String, default: '_self' },
  children: [this],
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
});

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true, unique: true },
  description: String,
  items: [menuItemSchema],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Menu', menuSchema);