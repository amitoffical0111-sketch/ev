'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FaBolt, FaTachometerAlt, FaRupeeSign } from 'react-icons/fa';
import { FiArrowRight, FiCalendar } from 'react-icons/fi';
import { HeroSlider } from '@/types';

const defaultSlides: HeroSlider[] = [
  {
    _id: '1',
    title: 'RIDE REAL.\nRIDE ELECTRIC.',
    subtitle: 'NEW GENERATION ELECTRIC SCOOTERS',
    description: 'High Performance. Zero Emission. Maximum Savings.',
    image: '/bike1.png',
    badge: 'New Generation Electric Scooters',
    ctaText: 'Explore Products',
    ctaLink: '/products',
    secondaryCtaText: 'Book Test Ride',
    secondaryCtaLink: '/book-test-ride',
    stats: [
      { icon: 'bolt', label: 'Eco Friendly', value: 'Zero Emission' },
      { icon: 'speed', label: 'High Performance', value: 'Powerful Motor' },
      { icon: 'rupee', label: 'Cost Effective', value: 'Save More' },
    ],
    isActive: true,
    sortOrder: 1,
  },
];

const iconMap: Record<string, React.ReactNode> = {
  bolt: <FaBolt className="text-[#5FAF00]" size={20} />,
  speed: <FaTachometerAlt className="text-[#5FAF00]" size={20} />,
  rupee: <FaRupeeSign className="text-[#5FAF00]" size={20} />,
};

interface Props { slides?: HeroSlider[]; }

export default function HeroSliderComponent({ slides = defaultSlides }: Props) {
  const activeSlides = (slides.length > 0 ? slides : defaultSlides).map(s => ({
    ...s,
    image: s.image || '/bike1.png',
  }));

  return (
    <section className="relative bg-gradient-to-br from-white via-[#f8fff0] to-white overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={activeSlides.length > 1}
        className="hero-swiper">
        {activeSlides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="container-custom md:min-h-[90vh] flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center w-full py-6 md:py-0">
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="order-2 md:order-1 text-center md:text-left">
                  {slide.badge && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-[#f0f9e8] text-[#5FAF00] text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                      <FaBolt size={10} /> {slide.badge}
                    </motion.div>
                  )}

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight mb-3">
                    {slide.title.split('\n').map((line, i) => (
                      <span key={i} className={`block ${i === 1 ? 'text-[#5FAF00]' : 'text-[#111]'}`}>{line}</span>
                    ))}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 text-base md:text-lg mb-5 leading-relaxed">
                    {slide.description}
                  </motion.p>

                  {/* Stats */}
                  {slide.stats && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                      {slide.stats.map((stat) => (
                        <div key={stat.label} className="flex items-center gap-2 bg-white border border-[#EAEAEA] rounded-xl px-3 py-2.5 shadow-sm">
                          {iconMap[stat.icon] || <FaBolt className="text-[#5FAF00]" size={16} />}
                          <div>
                            <div className="text-xs font-bold text-[#111] uppercase tracking-wide">{stat.label}</div>
                            <div className="text-xs text-gray-500">{stat.value}</div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap justify-center md:justify-start gap-3">
                    <Link href={slide.ctaLink || '/products'} className="btn-primary">
                      {slide.ctaText || 'Explore Products'} <FiArrowRight />
                    </Link>
                    <Link href={slide.secondaryCtaLink || '/book-test-ride'} className="btn-outline">
                      <FiCalendar /> {slide.secondaryCtaText || 'Book Test Ride'}
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Bike Image */}
                <motion.div
                  initial={{ opacity: 0, x: 40, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="order-1 md:order-2 relative flex items-center justify-center min-h-[260px] md:min-h-0">
                  {/* Background circle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-56 h-56 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-[#5FAF00]/15 to-[#1F7A00]/8" />
                  </div>
                  {/* Lightning bolt watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <FaBolt size={300} className="text-[#5FAF00]" />
                  </div>

                  <div className="relative z-10 float-animation w-full flex justify-center">
                    {slide.image ? (
                      <Image src={slide.image} alt={slide.title} width={600} height={450}
                        className="w-[90vw] max-w-[340px] md:w-full md:max-w-none h-auto object-contain drop-shadow-2xl" priority />
                    ) : (
                      <div className="w-72 h-56 md:w-[500px] md:h-[380px] bg-gradient-to-br from-[#f0f9e8] to-[#e8f5d0] rounded-3xl flex items-center justify-center">
                        <div className="text-center">
                          <FaBolt size={80} className="text-[#5FAF00] mx-auto mb-4 opacity-30" />
                          <p className="text-[#5FAF00] font-bold text-lg">Real E Bikes</p>
                          <p className="text-gray-400 text-sm">Premium Electric Scooter</p>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
