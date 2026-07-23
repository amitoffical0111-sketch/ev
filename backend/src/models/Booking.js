const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  type: { type: String, enum: ['test_ride', 'purchase'], required: true },
  bookingId: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    city: String,
    state: String,
  },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' },
  preferredDate: Date,
  preferredTime: String,
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  notes: String,
  source: { type: String, default: 'website' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

bookingSchema.pre('save', function (next) {
  if (!this.bookingId) {
    this.bookingId = 'REB' + Date.now().toString().slice(-8);
  }
  next();
});

module.exports = mongoose.model('Booking', bookingSchema);
