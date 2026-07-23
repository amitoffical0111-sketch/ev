const Product = require('../models/Product');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Dealer = require('../models/Dealer');
const Blog = require('../models/Blog');

exports.getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProducts, totalBookings, totalUsers, totalDealers,
      pendingBookings, todayBookings, featuredProducts, recentBookings,
    ] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      User.countDocuments({ role: 'customer' }),
      Dealer.countDocuments({ isActive: true }),
      Booking.countDocuments({ status: 'pending' }),
      Booking.countDocuments({ createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } }),
      Product.countDocuments({ isFeatured: true }),
      Booking.find().sort('-createdAt').limit(5).populate('product', 'name images'),
    ]);

    const bookingsByMonth = await Booking.aggregate([
      { $group: { _id: { month: { $month: '$createdAt' }, year: { $year: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
      { $limit: 12 },
    ]);

    const bookingsByStatus = await Booking.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const topProducts = await Booking.aggregate([
      { $group: { _id: '$product', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
      { $lookup: { from: 'products', localField: '_id', foreignField: '_id', as: 'product' } },
      { $unwind: '$product' },
    ]);

    res.json({
      success: true,
      stats: { totalProducts, totalBookings, totalUsers, totalDealers, pendingBookings, todayBookings, featuredProducts },
      bookingsByMonth,
      bookingsByStatus,
      topProducts,
      recentBookings,
    });
  } catch (err) { next(err); }
};

exports.getAnalytics = async (req, res, next) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const dailyBookings = await Booking.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    res.json({ success: true, dailyBookings, period: days });
  } catch (err) { next(err); }
};
