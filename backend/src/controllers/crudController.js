const APIFeatures = require('../utils/apiFeatures');

exports.getAll = (Model, populate = '') => async (req, res, next) => {
  try {
    const query = Model.find();
    if (populate) query.populate(populate);
    const features = new APIFeatures(query, req.query).filter().search(['name', 'title', 'question']).sort().paginate();
    const [docs, total] = await Promise.all([features.query, Model.countDocuments()]);
    res.json({ success: true, count: docs.length, total, data: docs });
  } catch (err) { next(err); }
};

exports.getOne = (Model, populate = '') => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.id);
    if (populate) query = query.populate(populate);
    const doc = await query;
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

exports.createOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.create(req.body);
    res.status(201).json({ success: true, data: doc });
  } catch (err) { next(err); }
};

exports.updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, data: doc });
  } catch (err) { next(err); }
};

exports.deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, message: 'Deleted successfully' });
  } catch (err) { next(err); }
};
