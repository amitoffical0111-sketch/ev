const Product = require('../models/Product');
const APIFeatures = require('../utils/apiFeatures');
const { uploadToCloudinary } = require('../middleware/upload');
const { getCache, setCache, delCache } = require('../config/redis');

exports.getProducts = async (req, res, next) => {
  try {
    const cacheKey = `products:${JSON.stringify(req.query)}`;
    const cached = await getCache(cacheKey);
    if (cached) return res.json(cached);

    const features = new APIFeatures(Product.find({ isActive: true }).populate('category', 'name slug'), req.query)
      .filter().search(['name', 'description']).sort().paginate();

    const [products, total] = await Promise.all([
      features.query,
      Product.countDocuments({ isActive: true }),
    ]);

    const response = { success: true, count: products.length, total, page: features.page, limit: features.limit, products };
    await setCache(cacheKey, response, 300);
    res.json(response);
  } catch (err) { next(err); }
};

exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug, isActive: true }).populate('category', 'name slug');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    await Product.findByIdAndUpdate(product._id, { $inc: { views: 1 } });
    res.json({ success: true, product });
  } catch (err) { next(err); }
};

exports.getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ isActive: true, isFeatured: true })
      .populate('category', 'name slug').sort('sortOrder').limit(8);
    res.json({ success: true, products });
  } catch (err) { next(err); }
};

exports.createProduct = async (req, res, next) => {
  try {
    const data = { ...req.body };
    // Parse nested fields like specifications[topSpeed]
    const specs = {};
    Object.keys(data).forEach(key => {
      const match = key.match(/^(\w+)\[(\w+)\]$/);
      if (match) {
        if (!data[match[1]]) data[match[1]] = {};
        data[match[1]][match[2]] = data[key];
        delete data[key];
      }
    });
    if (req.files?.length) {
      const uploads = await Promise.all(req.files.map(f => uploadToCloudinary(f.buffer, 'products')));
      data.images = uploads.map(u => u.secure_url).filter(Boolean);
    }
    if (!data.slug) data.slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    if (!data.sku) data.sku = 'REB-' + Date.now();
    const product = await Product.create(data);
    await delCache('products:*');
    res.status(201).json({ success: true, product });
  } catch (err) { next(err); }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.files?.length) {
      const uploads = await Promise.all(req.files.map(f => uploadToCloudinary(f.buffer, 'products')));
      data.images = [...(data.existingImages || []), ...uploads.map(u => u.secure_url)];
    }
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    await delCache('products:*');
    res.json({ success: true, product });
  } catch (err) { next(err); }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    await delCache('products:*');
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) { next(err); }
};

exports.duplicateProduct = async (req, res, next) => {
  try {
    const original = await Product.findById(req.params.id).lean();
    if (!original) return res.status(404).json({ success: false, message: 'Product not found' });
    delete original._id;
    original.name = `${original.name} (Copy)`;
    original.slug = `${original.slug}-copy-${Date.now()}`;
    original.sku = `${original.sku}-COPY`;
    const product = await Product.create(original);
    res.status(201).json({ success: true, product });
  } catch (err) { next(err); }
};

exports.compareProducts = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const products = await Product.find({ _id: { $in: ids } }).populate('category', 'name');
    res.json({ success: true, products });
  } catch (err) { next(err); }
};
