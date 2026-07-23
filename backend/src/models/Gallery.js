const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: String,
  image: { type: String, required: true },
  category: { type: String, default: 'general' },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  thumbnail: String,
  url: String,
  videoUrl: String,
  youtubeId: String,
  category: { type: String, default: 'general' },
  description: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = {
  Gallery: mongoose.model('Gallery', gallerySchema),
  Video: mongoose.model('Video', videoSchema),
};
