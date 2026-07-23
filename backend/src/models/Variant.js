const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  sku: { type: String, unique: true },
  color: String,
  colorCode: String,
  colorImage: String,
  images: [String],
  price: { type: Number, required: true },
  discountPrice: Number,
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Variant', variantSchema);