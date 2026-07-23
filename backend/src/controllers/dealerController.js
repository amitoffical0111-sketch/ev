const Dealer = require('../models/Dealer');
const APIFeatures = require('../utils/apiFeatures');

exports.getDealers = async (req, res, next) => {
  try {
    const features = new APIFeatures(Dealer.find({ isActive: true }), req.query)
      .filter().search(['name', 'address.city', 'address.state']).sort().paginate();
    const [dealers, total] = await Promise.all([features.query, Dealer.countDocuments({ isActive: true })]);
    res.json({ success: true, count: dealers.length, total, dealers });
  } catch (err) { next(err); }
};

exports.getNearbyDealers = async (req, res, next) => {
  try {
    const { lat, lng, radius = 50 } = req.query;
    if (!lat || !lng) return res.status(400).json({ success: false, message: 'Provide lat and lng' });

    const dealers = await Dealer.find({
      isActive: true,
      'location.lat': { $gte: parseFloat(lat) - 0.5, $lte: parseFloat(lat) + 0.5 },
      'location.lng': { $gte: parseFloat(lng) - 0.5, $lte: parseFloat(lng) + 0.5 },
    }).limit(20);
    res.json({ success: true, dealers });
  } catch (err) { next(err); }
};

exports.getDealer = async (req, res, next) => {
  try {
    const dealer = await Dealer.findById(req.params.id);
    if (!dealer) return res.status(404).json({ success: false, message: 'Dealer not found' });
    res.json({ success: true, dealer });
  } catch (err) { next(err); }
};

exports.createDealer = async (req, res, next) => {
  try {
    const dealer = await Dealer.create(req.body);
    res.status(201).json({ success: true, dealer });
  } catch (err) { next(err); }
};

exports.updateDealer = async (req, res, next) => {
  try {
    const dealer = await Dealer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!dealer) return res.status(404).json({ success: false, message: 'Dealer not found' });
    res.json({ success: true, dealer });
  } catch (err) { next(err); }
};

exports.deleteDealer = async (req, res, next) => {
  try {
    await Dealer.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Dealer deleted' });
  } catch (err) { next(err); }
};

exports.applyDealer = async (req, res, next) => {
  try {
    const dealer = await Dealer.create({ ...req.body, status: 'pending' });
    res.status(201).json({ success: true, message: 'Application submitted', dealer });
  } catch (err) { next(err); }
};
