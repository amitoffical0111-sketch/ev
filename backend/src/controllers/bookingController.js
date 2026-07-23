const Booking = require('../models/Booking');
const { sendEmail, bookingConfirmationEmail } = require('../utils/email');
const APIFeatures = require('../utils/apiFeatures');

exports.createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);
    await booking.populate('product', 'name images price');

    try {
      const emailContent = bookingConfirmationEmail(booking);
      await sendEmail({ to: booking.customer.email, ...emailContent });
    } catch (emailErr) {
      console.log('Email send failed:', emailErr.message);
    }

    res.status(201).json({ success: true, booking });
  } catch (err) { next(err); }
};

exports.getBookings = async (req, res, next) => {
  try {
    const features = new APIFeatures(
      Booking.find().populate('product', 'name images').populate('dealer', 'name city'),
      req.query
    ).filter().sort().paginate();

    const [bookings, total] = await Promise.all([features.query, Booking.countDocuments()]);
    res.json({ success: true, count: bookings.length, total, bookings });
  } catch (err) { next(err); }
};

exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('product dealer');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) { next(err); }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id, { status: req.body.status }, { new: true }
    ).populate('product', 'name');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, booking });
  } catch (err) { next(err); }
};

exports.getBookingStats = async (req, res, next) => {
  try {
    const stats = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    const total = await Booking.countDocuments();
    const today = await Booking.countDocuments({ createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } });
    res.json({ success: true, stats, total, today });
  } catch (err) { next(err); }
};
