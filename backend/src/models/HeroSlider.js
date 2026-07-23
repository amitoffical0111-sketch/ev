const mongoose = require('mongoose');

const heroSliderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: String,
  description: String,
  image: String,
  mobileImage: String,
  badge: String,
  ctaText: String,
  ctaLink: String,
  secondaryCtaText: String,
  secondaryCtaLink: String,
  stats: [{ icon: String, label: String, value: String }],
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('HeroSlider', heroSliderSchema);
