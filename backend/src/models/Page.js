const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  content: { type: String, required: true },
  excerpt: String,
  image: String,
  template: { type: String, default: 'default' },
  sections: [{
    type: { type: String },
    title: String,
    content: String,
    image: String,
    sortOrder: Number,
  }],
  metaTitle: String,
  metaDescription: String,
  metaKeywords: String,
  isPublished: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Page', pageSchema);