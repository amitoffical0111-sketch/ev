const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  variables: [String],
  category: { type: String, default: 'General' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);