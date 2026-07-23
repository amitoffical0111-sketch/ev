const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: String,
  content: { type: String, required: true },
  image: String,
  source: String,
  sourceUrl: String,
  category: String,
  tags: [String],
  isPublished: { type: Boolean, default: true },
  publishedAt: Date,
  views: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('News', newsSchema);