const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  metric: { type: String, required: true },
  value: { type: Number, default: 0 },
  category: { type: String, default: 'General' },
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

analyticsSchema.index({ date: -1, metric: 1 });

module.exports = mongoose.model('Analytics', analyticsSchema);