const mongoose = require('mongoose');

const dealerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  alternatePhone: String,
  address: { street: String, city: String, state: String, pincode: String },
  location: { lat: Number, lng: Number },
  logo: String,
  images: [String],
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'suspended'], default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  workingHours: String,
  services: [String],
  gstin: String,
  panNumber: String,
  bankDetails: { accountName: String, accountNumber: String, ifsc: String, bankName: String },
}, { timestamps: true });

dealerSchema.index({ 'location.lat': 1, 'location.lng': 1 });

module.exports = mongoose.model('Dealer', dealerSchema);
