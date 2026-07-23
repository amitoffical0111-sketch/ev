const express = require('express');
const Category = require('../models/Category');
const Blog = require('../models/Blog');
const FAQ = require('../models/FAQ');
const Testimonial = require('../models/Testimonial');
const FinancePartner = require('../models/FinancePartner');
const HeroSlider = require('../models/HeroSlider');
const { Gallery, Video } = require('../models/Gallery');
const { Career, JobApplication } = require('../models/Career');
const { protect, authorize } = require('../middleware/auth');
const { getAll, getOne, createOne, updateOne, deleteOne } = require('../controllers/crudController');
const { upload, uploadToCloudinary } = require('../middleware/upload');

// Categories
const catRouter = express.Router();
catRouter.get('/', getAll(Category));
catRouter.get('/:id', getOne(Category));
catRouter.post('/', protect, authorize('admin'), createOne(Category));
catRouter.put('/:id', protect, authorize('admin'), updateOne(Category));
catRouter.delete('/:id', protect, authorize('admin'), deleteOne(Category));

// Blogs
const blogRouter = express.Router();
blogRouter.get('/', getAll(Blog, 'author'));
blogRouter.get('/:id', getOne(Blog, 'author'));
blogRouter.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const data = { ...req.body, author: req.user._id };
    if (!data.slug) data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const blog = await Blog.create(data);
    res.status(201).json({ success: true, data: blog });
  } catch (err) { next(err); }
});
blogRouter.put('/:id', protect, authorize('admin'), updateOne(Blog));
blogRouter.delete('/:id', protect, authorize('admin'), deleteOne(Blog));

// FAQs
const faqRouter = express.Router();
faqRouter.get('/', getAll(FAQ));
faqRouter.post('/', protect, authorize('admin'), createOne(FAQ));
faqRouter.put('/:id', protect, authorize('admin'), updateOne(FAQ));
faqRouter.delete('/:id', protect, authorize('admin'), deleteOne(FAQ));

// Testimonials
const testimonialRouter = express.Router();
testimonialRouter.get('/', getAll(Testimonial));
testimonialRouter.post('/', protect, authorize('admin'), createOne(Testimonial));
testimonialRouter.put('/:id', protect, authorize('admin'), updateOne(Testimonial));
testimonialRouter.delete('/:id', protect, authorize('admin'), deleteOne(Testimonial));

// Finance Partners
const financeRouter = express.Router();
financeRouter.get('/', getAll(FinancePartner));
financeRouter.post('/', protect, authorize('admin'), createOne(FinancePartner));
financeRouter.put('/:id', protect, authorize('admin'), updateOne(FinancePartner));
financeRouter.delete('/:id', protect, authorize('admin'), deleteOne(FinancePartner));

// Hero Sliders
const heroRouter = express.Router();
heroRouter.get('/', getAll(HeroSlider));
heroRouter.post('/', protect, authorize('admin'), upload.single('image'), async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'hero');
      data.image = result.secure_url;
    }
    const slider = await HeroSlider.create(data);
    res.status(201).json({ success: true, data: slider });
  } catch (err) { next(err); }
});
heroRouter.put('/:id', protect, authorize('admin'), updateOne(HeroSlider));
heroRouter.delete('/:id', protect, authorize('admin'), deleteOne(HeroSlider));

// Gallery
const galleryRouter = express.Router();
galleryRouter.get('/', getAll(Gallery));
galleryRouter.post('/', protect, authorize('admin'), upload.single('image'), async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'gallery');
      data.image = result.secure_url;
    }
    const item = await Gallery.create(data);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
});
galleryRouter.delete('/:id', protect, authorize('admin'), deleteOne(Gallery));

// Videos
const videoRouter = express.Router();
videoRouter.get('/', getAll(Video));
videoRouter.post('/', protect, authorize('admin'), createOne(Video));
videoRouter.put('/:id', protect, authorize('admin'), updateOne(Video));
videoRouter.delete('/:id', protect, authorize('admin'), deleteOne(Video));

// Careers
const careerRouter = express.Router();
careerRouter.get('/', getAll(Career));
careerRouter.get('/:id', getOne(Career));
careerRouter.post('/', protect, authorize('admin'), createOne(Career));
careerRouter.put('/:id', protect, authorize('admin'), updateOne(Career));
careerRouter.delete('/:id', protect, authorize('admin'), deleteOne(Career));
careerRouter.post('/:id/apply', upload.single('resume'), async (req, res, next) => {
  try {
    const data = { ...req.body, career: req.params.id };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'resumes', 'raw');
      data.resume = result.secure_url;
    }
    const application = await JobApplication.create(data);
    res.status(201).json({ success: true, data: application });
  } catch (err) { next(err); }
});

// Job Applications
const jobAppRouter = express.Router();
jobAppRouter.get('/', protect, authorize('admin'), getAll(JobApplication, 'career'));
jobAppRouter.put('/:id', protect, authorize('admin'), updateOne(JobApplication));

// Media Upload
const mediaRouter = express.Router();
mediaRouter.post('/upload', protect, authorize('admin'), upload.array('files', 20), async (req, res, next) => {
  try {
    const uploads = await Promise.all(req.files.map(f => uploadToCloudinary(f.buffer, 'media')));
    const urls = uploads.map(u => ({ url: u.secure_url, publicId: u.public_id, format: u.format }));
    res.json({ success: true, files: urls });
  } catch (err) { next(err); }
});

// Users (Admin)
const User = require('../models/User');
const userRouter = express.Router();
userRouter.get('/', protect, authorize('admin'), getAll(User));
userRouter.get('/:id', protect, authorize('admin'), getOne(User));
userRouter.put('/:id', protect, authorize('admin'), updateOne(User));
userRouter.delete('/:id', protect, authorize('admin'), deleteOne(User));

// Service Centers
const ServiceCenter = require('../models/ServiceCenter');
const serviceCenterRouter = express.Router();
serviceCenterRouter.get('/', getAll(ServiceCenter));
serviceCenterRouter.get('/:id', getOne(ServiceCenter));
serviceCenterRouter.post('/', protect, authorize('admin'), createOne(ServiceCenter));
serviceCenterRouter.put('/:id', protect, authorize('admin'), updateOne(ServiceCenter));
serviceCenterRouter.delete('/:id', protect, authorize('admin'), deleteOne(ServiceCenter));

// News
const News = require('../models/News');
const newsRouter = express.Router();
newsRouter.get('/', getAll(News));
newsRouter.get('/:id', getOne(News));
newsRouter.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug) data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    if (data.isPublished && !data.publishedAt) data.publishedAt = new Date();
    const news = await News.create(data);
    res.status(201).json({ success: true, data: news });
  } catch (err) { next(err); }
});
newsRouter.put('/:id', protect, authorize('admin'), updateOne(News));
newsRouter.delete('/:id', protect, authorize('admin'), deleteOne(News));

// Orders
const Order = require('../models/Order');
const orderRouter = express.Router();
orderRouter.get('/', protect, authorize('admin'), getAll(Order, 'user'));
orderRouter.get('/:id', protect, authorize('admin'), getOne(Order, 'user'));
orderRouter.post('/', async (req, res, next) => {
  try {
    const orderId = 'ORD-' + Date.now();
    const order = await Order.create({ ...req.body, orderId });
    res.status(201).json({ success: true, data: order });
  } catch (err) { next(err); }
});
orderRouter.put('/:id', protect, authorize('admin'), updateOne(Order));
orderRouter.delete('/:id', protect, authorize('admin'), deleteOne(Order));

// Downloads
const Download = require('../models/Download');
const downloadRouter = express.Router();
downloadRouter.get('/', getAll(Download));
downloadRouter.get('/:id', getOne(Download));
downloadRouter.post('/', protect, authorize('admin'), upload.single('file'), async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'downloads', 'raw');
      data.file = result.secure_url;
    }
    const download = await Download.create(data);
    res.status(201).json({ success: true, data: download });
  } catch (err) { next(err); }
});
downloadRouter.put('/:id', protect, authorize('admin'), updateOne(Download));
downloadRouter.delete('/:id', protect, authorize('admin'), deleteOne(Download));

module.exports = {
  catRouter, blogRouter, faqRouter, testimonialRouter, financeRouter,
  heroRouter, galleryRouter, videoRouter, careerRouter, jobAppRouter,
  mediaRouter, userRouter, serviceCenterRouter, newsRouter, orderRouter, downloadRouter,
};
