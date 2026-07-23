const mongoose = require('mongoose');

const serviceCenterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: { type: String, required: true },
  address: {
    street: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: String,
    country: { type: String, default: 'India' },
  },
  location: {
    lat: Number,
    lng: Number,
  },
  image: String,
  workingHours: String,
  services: [String],
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('ServiceCenter', serviceCenterSchema);