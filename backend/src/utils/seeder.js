require('dotenv').config();
require('dns').setDefaultResultOrder('ipv4first');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const User = require('../models/User');
const Category = require('../models/Category');
const Product = require('../models/Product');
const Settings = require('../models/Settings');
const HeroSlider = require('../models/HeroSlider');
const FAQ = require('../models/FAQ');
const Testimonial = require('../models/Testimonial');
const FinancePartner = require('../models/FinancePartner');

const categories = [
  { name: 'RTO Approved', slug: 'rto-approved', description: 'Government approved electric scooters', sortOrder: 1 },
  { name: 'Non-RTO', slug: 'non-rto', description: 'Non-RTO electric scooters', sortOrder: 2 },
  { name: 'High Speed', slug: 'high-speed', description: 'High speed electric scooters above 45 km/h', sortOrder: 3 },
  { name: 'Low Speed', slug: 'low-speed', description: 'Low speed electric scooters up to 25 km/h', sortOrder: 4 },
  { name: 'Cruiser Bikes', slug: 'cruiser', description: 'Electric cruiser bikes', sortOrder: 5 },
  { name: 'Three Wheelers', slug: 'three-wheeler', description: 'Electric three wheelers', sortOrder: 6 },
];

const settings = [
  { key: 'site_name', value: 'Real E Bikes', group: 'general', label: 'Site Name' },
  { key: 'site_tagline', value: 'Ride Real. Ride Electric.', group: 'general', label: 'Tagline' },
  { key: 'site_email', value: 'info@realebikes.com', group: 'contact', label: 'Email' },
  { key: 'site_phone', value: '+91 99536 67830', group: 'contact', label: 'Phone' },
  { key: 'site_address', value: '123, EV Tech Park, Noida, Uttar Pradesh - 201301', group: 'contact', label: 'Address' },
  { key: 'working_hours', value: 'Mon - Sat : 10AM - 7PM', group: 'contact', label: 'Working Hours' },
  { key: 'whatsapp_number', value: '+919953667830', group: 'contact', label: 'WhatsApp' },
  { key: 'facebook_url', value: 'https://facebook.com/realebikes', group: 'social', label: 'Facebook' },
  { key: 'instagram_url', value: 'https://instagram.com/realebikes', group: 'social', label: 'Instagram' },
  { key: 'youtube_url', value: 'https://youtube.com/realebikes', group: 'social', label: 'YouTube' },
  { key: 'primary_color', value: '#5FAF00', group: 'theme', label: 'Primary Color', type: 'color' },
  { key: 'secondary_color', value: '#1F7A00', group: 'theme', label: 'Secondary Color', type: 'color' },
  { key: 'top_bar_text', value: '⚡ Go Green, Ride Clean.', group: 'general', label: 'Top Bar Text' },
  { key: 'google_map_embed', value: '', group: 'contact', label: 'Google Map Embed URL' },
  { key: 'meta_title', value: 'Real E Bikes - Ride Real. Ride Electric.', group: 'seo', label: 'Meta Title' },
  { key: 'meta_description', value: 'Real E Bikes offers premium electric scooters with high performance, zero emission and maximum savings.', group: 'seo', label: 'Meta Description' },
];

const faqs = [
  { question: 'What is the range of Real E Bikes?', answer: 'Our electric scooters offer a range of 50-120+ km on a single charge depending on the model.', category: 'general', sortOrder: 1 },
  { question: 'How long does it take to charge?', answer: 'Charging time varies from 4-8 hours for a full charge. Fast charging options are available on select models.', category: 'charging', sortOrder: 2 },
  { question: 'Do I need a license to ride?', answer: 'RTO approved models require a valid driving license. Non-RTO models (up to 25 km/h) do not require a license.', category: 'legal', sortOrder: 3 },
  { question: 'What is the warranty period?', answer: 'We offer 5+ years warranty on battery and motor. Vehicle warranty is 2 years.', category: 'warranty', sortOrder: 4 },
  { question: 'Are EMI options available?', answer: 'Yes, we have tie-ups with multiple finance partners offering easy EMI options starting from ₹999/month.', category: 'finance', sortOrder: 5 },
  { question: 'How do I find the nearest dealer?', answer: 'Use our Dealer Locator on the website or call our helpline at +91 99536 67830.', category: 'dealers', sortOrder: 6 },
];

const testimonials = [
  { name: 'Rahul Sharma', location: 'Delhi', rating: 5, review: 'Amazing scooter! The range is excellent and the build quality is top-notch. Highly recommend Real E Bikes.', isFeatured: true },
  { name: 'Priya Patel', location: 'Mumbai', rating: 5, review: 'Switched from petrol to Real E Bikes 6 months ago. Saving ₹3000+ every month on fuel. Best decision ever!', isFeatured: true },
  { name: 'Amit Kumar', location: 'Bangalore', rating: 4, review: 'Great performance and smooth ride. The after-sales service is excellent. Very happy with my purchase.', isFeatured: true },
  { name: 'Sunita Verma', location: 'Pune', rating: 5, review: 'The Real Legend DLX+ is perfect for city commuting. Zero maintenance cost and eco-friendly. Love it!', isFeatured: true },
];

const financePartners = [
  { name: 'HDFC Bank', description: 'Easy EMI options with competitive interest rates', interestRate: '8.5% p.a.', tenure: '12-60 months', minAmount: 30000, maxAmount: 200000, isActive: true, sortOrder: 1 },
  { name: 'Bajaj Finance', description: 'Quick approval with minimal documentation', interestRate: '9% p.a.', tenure: '6-48 months', minAmount: 25000, maxAmount: 150000, isActive: true, sortOrder: 2 },
  { name: 'ICICI Bank', description: 'Flexible repayment options', interestRate: '8.75% p.a.', tenure: '12-60 months', minAmount: 30000, maxAmount: 200000, isActive: true, sortOrder: 3 },
];

const seed = async () => {
  await connectDB();
  try {
    await Promise.all([
      User.deleteMany({}), Category.deleteMany({}), Settings.deleteMany({}),
      FAQ.deleteMany({}), Testimonial.deleteMany({}), FinancePartner.deleteMany({}),
      HeroSlider.deleteMany({}),
    ]);

    const adminUser = await User.create({
      name: 'Admin User', email: 'admin@realebikes.com', password: 'Admin@123',
      role: 'admin', isActive: true, isEmailVerified: true,
    });

    const cats = await Category.insertMany(categories);
    await Settings.insertMany(settings);
    await FAQ.insertMany(faqs);
    await Testimonial.insertMany(testimonials);
    await FinancePartner.insertMany(financePartners);

    const rtoCategory = cats.find(c => c.slug === 'rto-approved');
    const nonRtoCategory = cats.find(c => c.slug === 'non-rto');
    const highSpeedCategory = cats.find(c => c.slug === 'high-speed');

    await Product.insertMany([
      {
        name: 'Real Legend DLX+', slug: 'real-legend-dlx-plus', sku: 'REB-001',
        category: rtoCategory._id, badge: 'RTO Approved',
        tagline: 'The Legend Redefined', price: 91499, emiStartsFrom: 1999,
        shortDescription: 'High performance electric scooter with 70 km/h top speed and 120+ km range.',
        description: 'The Real Legend DLX+ is our flagship electric scooter designed for the modern commuter. With a powerful 2000W motor and advanced lithium-ion battery, it delivers exceptional performance while being completely eco-friendly.',
        images: ['/images/products/legend-dlx-1.jpg'],
        specifications: { motor: 'BLDC Hub Motor', motorPower: '2000W', battery: 'Lithium-Ion', batteryCapacity: '72V 30Ah', chargingTime: '6-8 Hours', range: '120+ km', topSpeed: '70 km/h', warranty: '5 Years', brakes: 'Disc Brake (Front & Rear)', tyreSize: '90/90-12' },
        features: ['Self Diagnosis', 'Remote Lock', 'Disc Brake', 'Reverse Parking', 'Fast Charging', 'ABS', 'Digital Display', 'USB Charging'],
        isActive: true, isFeatured: true, isBestSeller: true, sortOrder: 1,
      },
      {
        name: 'Real Rider', slug: 'real-rider', sku: 'REB-002',
        category: nonRtoCategory._id, badge: 'Non-RTO',
        tagline: 'Ride Without Limits', price: 61499, emiStartsFrom: 1299,
        shortDescription: 'Affordable non-RTO electric scooter perfect for daily commuting.',
        description: 'The Real Rider is the perfect entry-level electric scooter for daily commuting. No license required, no registration needed. Just charge and ride!',
        images: ['/images/products/rider-1.jpg'],
        specifications: { motor: 'BLDC Hub Motor', motorPower: '250W', battery: 'Lithium-Ion', batteryCapacity: '48V 24Ah', chargingTime: '4-6 Hours', range: '80+ km', topSpeed: '25 km/h', warranty: '3 Years', brakes: 'Drum Brake', tyreSize: '90/90-10' },
        features: ['Self Diagnosis', 'Anti-Theft Lock', 'Charging Port', 'Comfortable Seat', 'Noise Free', 'Digital Display'],
        isActive: true, isFeatured: true, sortOrder: 2,
      },
      {
        name: 'Real Royal Pro', slug: 'real-royal-pro', sku: 'REB-003',
        category: rtoCategory._id, badge: 'RTO Approved',
        tagline: 'Royal Performance', price: 91499, emiStartsFrom: 1999,
        shortDescription: 'Premium electric scooter with royal styling and pro performance.',
        description: 'The Real Royal Pro combines premium styling with exceptional performance. Perfect for those who want to make a statement while riding green.',
        images: ['/images/products/royal-pro-1.jpg'],
        specifications: { motor: 'BLDC Hub Motor', motorPower: '2000W', battery: 'Lithium-Ion', batteryCapacity: '72V 30Ah', chargingTime: '6-8 Hours', range: '120+ km', topSpeed: '70 km/h', warranty: '5 Years', brakes: 'Disc Brake', tyreSize: '90/90-12' },
        features: ['Self Diagnosis', 'Remote Lock', 'Disc Brake', 'Reverse Parking', 'Fast Charging', 'ABS', 'Cruise Control'],
        isActive: true, isFeatured: true, sortOrder: 3,
      },
      {
        name: 'Real Prime Pro', slug: 'real-prime-pro', sku: 'REB-004',
        category: highSpeedCategory._id, badge: 'RTO Approved',
        tagline: 'Prime Performance', price: 97999, emiStartsFrom: 2199,
        shortDescription: 'Top-of-the-line high speed electric scooter for performance enthusiasts.',
        description: 'The Real Prime Pro is our most advanced electric scooter, featuring cutting-edge technology and premium components for the ultimate riding experience.',
        images: ['/images/products/prime-pro-1.jpg'],
        specifications: { motor: 'BLDC Hub Motor', motorPower: '3000W', battery: 'Lithium-Ion NMC', batteryCapacity: '72V 40Ah', chargingTime: '5-7 Hours', range: '150+ km', topSpeed: '80 km/h', warranty: '5 Years', brakes: 'CBS Disc Brake', tyreSize: '100/80-12' },
        features: ['Self Diagnosis', 'Remote Lock', 'CBS Disc Brake', 'Reverse Parking', 'Fast Charging', 'ABS', 'GPS Tracking', 'App Connected'],
        isActive: true, isFeatured: true, sortOrder: 4,
      },
    ]);

    await HeroSlider.insertMany([
      {
        title: 'RIDE REAL.\nRIDE ELECTRIC.', subtitle: 'Driving the Future of Green Mobility',
        description: 'Driving the Future of Green Mobility',
        badge: 'GREEN MOBILITY FOR EVERYONE',
        ctaText: 'Explore Products', ctaLink: '/products',
        secondaryCtaText: 'Book Test Ride', secondaryCtaLink: '/book-test-ride',
        stats: [
          { icon: 'bolt', label: 'Eco Friendly', value: 'Zero Emission' },
          { icon: 'speed', label: 'High Performance', value: 'Powerful Motor' },
          { icon: 'rupee', label: 'Cost Effective', value: 'Save More' },
        ],
        isActive: true, sortOrder: 1,
      },
    ]);

    console.log('✅ Database seeded successfully!');
    console.log('Admin: admin@realebikes.com / Admin@123');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
};

seed();
