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
    subtitle: 'Driving the Future of Green Mobility',
    description: 'Driving the Future of Green Mobility',
    image: '/bike1.png',
    badge: '🍃 GREEN MOBILITY FOR EVERYONE',
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
  bolt: <FaBolt className="text-[#5FAF00]" size={16} />,
  speed: <FaTachometerAlt className="text-[#5FAF00]" size={16} />,
  rupee: <FaRupeeSign className="text-[#5FAF00]" size={16} />,
};

interface Props { slides?: HeroSlider[]; }

export default function HeroSliderComponent({ slides = defaultSlides }: Props) {
  const activeSlides = (slides.length > 0 ? slides : defaultSlides).map(s => ({
    ...s,
    image: s.image || '/bike1.png',
  }));

  return (
    <section className="relative bg-gradient-to-br from-white via-[#f6fef0] to-white overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#5FAF00]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#5FAF00]/4 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={activeSlides.length > 1}
        className="hero-swiper"
      >
        {activeSlides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="container-custom md:min-h-[88vh] flex items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center w-full py-10 md:py-0">

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="order-2 md:order-1 text-center md:text-left"
                >
                  {slide.badge && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="inline-flex items-center gap-2 bg-[#5FAF00]/10 text-[#5FAF00] text-[11px] font-bold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-widest border border-[#5FAF00]/20"
                    >
                      <FaBolt size={9} /> 🍃 GREEN MOBILITY FOR EVERYONE
                    </motion.div>
                  )}

                  <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-[2.6rem] md:text-[3.5rem] lg:text-[4.2rem] font-black leading-[1.05] tracking-tight mb-4"
                  >
                    {slide.title.split('\n').map((line, i) => (
                      <span key={i} className={`block ${i === 1 ? 'text-[#5FAF00]' : 'text-[#0d0d0d]'}`}>
                        {line}
                      </span>
                    ))}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                    className="text-gray-500 text-base md:text-[17px] mb-7 leading-relaxed max-w-md mx-auto md:mx-0"
                  >
                    Driving the Future of Green Mobility
                  </motion.p>

                  {/* Stats */}
                  {slide.stats && (
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.5 }}
                      className="flex flex-wrap justify-center md:justify-start gap-2.5 mb-8"
                    >
                      {slide.stats.map((stat) => (
                        <div
                          key={stat.label}
                          className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-2xl px-3.5 py-2.5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                        >
                          <div className="w-7 h-7 bg-[#f0f9e8] rounded-lg flex items-center justify-center flex-shrink-0">
                            {iconMap[stat.icon] || <FaBolt className="text-[#5FAF00]" size={14} />}
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-[#111] uppercase tracking-wide leading-tight">{stat.label}</div>
                            <div className="text-[11px] text-gray-400 leading-tight">{stat.value}</div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.65, duration: 0.5 }}
                    className="flex flex-wrap justify-center md:justify-start gap-3"
                  >
                    <Link href={slide.ctaLink || '/products'} className="btn-primary text-[14px]">
                      {slide.ctaText || 'Explore Products'} <FiArrowRight size={15} />
                    </Link>
                    <Link href={slide.secondaryCtaLink || '/book-test-ride'} className="btn-outline text-[14px]">
                      <FiCalendar size={14} /> {slide.secondaryCtaText || 'Book Test Ride'}
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Bike Image */}
                <motion.div
                  initial={{ opacity: 0, x: 32, scale: 0.96 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="order-1 md:order-2 relative flex items-center justify-center min-h-[260px] md:min-h-0"
                >
                  {/* Glow ring */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-64 h-64 md:w-[420px] md:h-[420px] rounded-full bg-gradient-to-br from-[#5FAF00]/12 via-[#5FAF00]/6 to-transparent" />
                  </div>
                  {/* Outer glow */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-48 h-48 md:w-80 md:h-80 rounded-full bg-[#5FAF00]/8 blur-2xl" />
                  </div>

                  <div className="relative z-10 float-animation w-full flex justify-center">
                    {slide.image ? (
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        width={620}
                        height={460}
                        className="w-[85vw] max-w-[320px] md:w-full md:max-w-none h-auto object-contain drop-shadow-2xl"
                        priority
                        style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
                      />
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
