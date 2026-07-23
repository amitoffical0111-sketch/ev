const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: mongoose.Schema.Types.ObjectId, ref: 'Variant' },
  name: String,
  image: String,
  price: Number,
  quantity: { type: Number, required: true },
  color: String,
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true, required: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'India' },
    },
  },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  couponCode: String,
  tax: { type: Number, default: 0 },
  shipping: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['cod', 'online', 'emi'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending',
  },
  trackingId: String,
  notes: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dealer: { type: mongoose.Schema.Types.ObjectId, ref: 'Dealer' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);