const mongoose = require('mongoose');

const financePartnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  description: String,
  interestRate: String,
  tenure: String,
  minAmount: Number,
  maxAmount: Number,
  website: String,
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('FinancePartner', financePartnerSchema);
