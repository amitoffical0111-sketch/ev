'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '@/components/products/ProductCard';
import { Product, Category } from '@/types';

const DEMO_PRODUCTS: Product[] = Array.from({ length: 6 }, (_, i) => ({
  _id: `demo-${i}`,
  name: ['EcoRide X1', 'SpeedMax Pro', 'UrbanGlide 200', 'PowerZap S', 'SwiftVolt 3', 'NeoCharge Elite'][i],
  slug: `demo-product-${i}`,
  sku: `SKU-00${i}`,
  category: { _id: 'cat1', name: 'Electric Scooter', slug: 'electric-scooter', isActive: true },
  badge: ['New', 'Best Seller', 'Hot', '', 'New', 'Best Seller'][i],
  tagline: 'Ride the Future',
  description: '',
  shortDescription: '',
  images: [['/bikep1.png'], ['/bikep2.png'], ['/bikep3.png'], ['/bikep4.png'], ['/bikep1.png'], ['/bikep2.png']][i],
  price: [89999, 109999, 74999, 129999, 94999, 149999][i],
  discountPrice: [99999, 119999, 84999, 139999, 104999, 159999][i],
  emiStartsFrom: [2499, 2999, 1999, 3499, 2599, 3999][i],
  specifications: { topSpeed: `${[65, 80, 55, 90, 70, 95][i]} km/h`, range: `${[100, 130, 85, 150, 110, 160][i]} km` },
  features: [],
  accessories: [],
  colors: [],
  isActive: true,
  isFeatured: true,
  isBestSeller: i === 1,
  isNewArrival: i === 0,
  ratings: { average: 4.5, count: 120 },
  views: 0,
  createdAt: new Date().toISOString(),
}));

interface Props {
  products: Product[];
  categories: Category[];
}

export default function ProductsSection({ products, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState('all');

  const displayProducts = products.length > 0 ? products : DEMO_PRODUCTS;

  const filtered = activeCategory === 'all'
    ? displayProducts
    : displayProducts.filter(p => p.category?.slug === activeCategory);

  const allCategories = [{ _id: 'all', name: 'All', slug: 'all' }, ...categories];

  return (
    <section className="section bg-white">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Our Premium Range</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#111]">
              Electric Scooters for <span className="text-[#5FAF00]">Every Ride</span>
            </h2>
          </div>
          <Link href="/products" className="btn-outline text-sm self-start md:self-auto">
            View All Products <FiArrowRight />
          </Link>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide">
          {allCategories.map((cat) => (
            <motion.button
              key={cat._id}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.slug)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat.slug
                  ? 'bg-[#5FAF00] text-white shadow-md'
                  : 'bg-white border border-[#EAEAEA] text-[#111] hover:border-[#5FAF00] hover:text-[#5FAF00]'
              }`}>
              {cat.name}
            </motion.button>
          ))}
        </div>

        {/* Products Slider */}
        {filtered.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={20}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="pb-12">
            {filtered.map((product, i) => (
              <SwiperSlide key={product._id}>
                <ProductCard product={product} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
