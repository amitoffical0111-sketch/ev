require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const errorHandler = require('./middleware/error');

const app = express();

// Connect databases
connectDB();
connectRedis();

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    process.env.ADMIN_URL,
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean),
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX || 100),
  message: { success: false, message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
const {
  catRouter, blogRouter, faqRouter, testimonialRouter, financeRouter,
  heroRouter, galleryRouter, videoRouter, careerRouter, jobAppRouter,
  mediaRouter, userRouter, serviceCenterRouter, newsRouter, orderRouter, downloadRouter,
} = require('./routes/misc');

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', catRouter);
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/dealers', require('./routes/dealers'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/blogs', blogRouter);
app.use('/api/faqs', faqRouter);
app.use('/api/testimonials', testimonialRouter);
app.use('/api/finance-partners', financeRouter);
app.use('/api/hero-sliders', heroRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/videos', videoRouter);
app.use('/api/careers', careerRouter);
app.use('/api/job-applications', jobAppRouter);
app.use('/api/media', mediaRouter);
app.use('/api/users', userRouter);
app.use('/api/service-centers', serviceCenterRouter);
app.use('/api/news', newsRouter);
app.use('/api/orders', orderRouter);
app.use('/api/downloads', downloadRouter);
app.use('/api/admin', require('./routes/admin'));

// Health check
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Real E Bikes API Running', env: process.env.NODE_ENV }));

// 404 handler
app.use('*', (req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));

module.exports = app;
