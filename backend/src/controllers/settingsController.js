const Settings = require('../models/Settings');
const { getCache, setCache, delCache } = require('../config/redis');

exports.getSettings = async (req, res, next) => {
  try {
    const { group } = req.query;
    const cached = await getCache(`settings:${group || 'all'}`);
    if (cached) return res.json(cached);

    const query = group ? { group } : {};
    const settings = await Settings.find(query);
    const settingsMap = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {});

    const response = { success: true, settings: settingsMap };
    await setCache(`settings:${group || 'all'}`, response, 600);
    res.json(response);
  } catch (err) { next(err); }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const updates = req.body;
    const ops = Object.entries(updates).map(([key, value]) => ({
      updateOne: { filter: { key }, update: { $set: { value } }, upsert: true },
    }));
    await Settings.bulkWrite(ops);
    await delCache('settings:*');
    res.json({ success: true, message: 'Settings updated' });
  } catch (err) { next(err); }
};

exports.getSetting = async (req, res, next) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });
    if (!setting) return res.status(404).json({ success: false, message: 'Setting not found' });
    res.json({ success: true, value: setting.value });
  } catch (err) { next(err); }
};
