const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: String,
  color: String,
  colorCode: String,
  images: [String],
  price: Number,
  stock: { type: Number, default: 0 },
  sku: String,
});

const specSchema = new mongoose.Schema({
  motor: String,
  motorPower: String,
  battery: String,
  batteryCapacity: String,
  chargingTime: String,
  range: String,
  topSpeed: String,
  loadCapacity: String,
  brakes: String,
  tyreSize: String,
  wheelBase: String,
  groundClearance: String,
  seatHeight: String,
  kerbWeight: String,
  dimensions: String,
  warranty: String,
  chargerType: String,
  ipRating: String,
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  sku: { type: String, unique: true, sparse: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  badge: { type: String, enum: ['RTO Approved', 'Non-RTO', 'New', 'Best Seller', 'Limited', ''] },
  tagline: String,
  description: String,
  shortDescription: String,
  images: [String],
  video: String,
  brochure: String,
  price: { type: Number, required: true },
  discountPrice: Number,
  emiStartsFrom: Number,
  variants: [variantSchema],
  specifications: specSchema,
  features: [String],
  accessories: [{ name: String, price: Number, image: String }],
  colors: [{ name: String, code: String, image: String }],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
  ratings: { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  views: { type: Number, default: 0 },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', slug: 'text' });

module.exports = mongoose.model('Product', productSchema);
