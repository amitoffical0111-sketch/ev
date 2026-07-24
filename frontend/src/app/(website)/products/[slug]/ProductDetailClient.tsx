'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/navigation';
import { FiHeart, FiShare2, FiDownload, FiCalendar, FiShoppingCart, FiCheck } from 'react-icons/fi';
import { FaBolt, FaTachometerAlt, FaBatteryFull, FaShieldAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/slices/cartSlice';
import { toggleWishlist, isInWishlist } from '@/store/slices/wishlistSlice';
import { RootState } from '@/store';
import { Product } from '@/types';
import { formatPrice, getImageUrl, calculateEMI } from '@/lib/utils';

interface Props { product: Product; }

export default function ProductDetailClient({ product }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'accessories'>('specs');
  const [added, setAdded] = useState(false);
  const dispatch = useDispatch();
  const inWishlist = useSelector((state: RootState) => isInWishlist(state, product._id));

  const handleAddToCart = () => {
    dispatch(addToCart({ product }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const images = product.images?.length > 0 ? product.images : ['/images/placeholder-bike.jpg'];
  const emi = calculateEMI(product.price);

  const specItems = [
    { label: 'Motor', value: product.specifications?.motor },
    { label: 'Motor Power', value: product.specifications?.motorPower },
    { label: 'Battery', value: product.specifications?.battery },
    { label: 'Battery Capacity', value: product.specifications?.batteryCapacity },
    { label: 'Charging Time', value: product.specifications?.chargingTime },
    { label: 'Range', value: product.specifications?.range },
    { label: 'Top Speed', value: product.specifications?.topSpeed },
    { label: 'Brakes', value: product.specifications?.brakes },
    { label: 'Tyre Size', value: product.specifications?.tyreSize },
    { label: 'Warranty', value: product.specifications?.warranty },
    { label: 'Ground Clearance', value: product.specifications?.groundClearance },
    { label: 'Kerb Weight', value: product.specifications?.kerbWeight },
  ].filter(s => s.value);

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-8">
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#5FAF00]">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-[#5FAF00]">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-[#111] break-words">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <Swiper modules={[Thumbs, Navigation]} thumbs={{ swiper: thumbsSwiper }} navigation
              className="rounded-3xl overflow-hidden bg-[#f8fff0] mb-3">
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="relative h-72 md:h-96">
                    <Image src={getImageUrl(img)} alt={`${product.name} ${i + 1}`} fill className="object-contain p-6" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <Swiper onSwiper={setThumbsSwiper} spaceBetween={8} slidesPerView={4} watchSlidesProgress>
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="relative h-16 rounded-xl overflow-hidden bg-[#f8fff0] cursor-pointer border-2 border-transparent hover:border-[#5FAF00] transition-colors">
                    <Image src={getImageUrl(img)} alt="" fill className="object-contain p-2" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div>
            {product.badge && (
              <span className={`inline-block mb-3 ${product.badge === 'RTO Approved' ? 'badge-rto' : 'badge-non-rto'}`}>
                {product.badge}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-2 break-words">{product.name}</h1>
            {product.tagline && <p className="text-[#5FAF00] font-medium mb-4">{product.tagline}</p>}

            <div className="grid grid-cols-2 gap-3 mb-6">
              {product.specifications?.topSpeed && (
                  <div className="flex min-w-0 items-center gap-2 bg-[#f8fff0] rounded-xl p-3">
                  <FaTachometerAlt className="text-[#5FAF00]" size={18} />
                  <div className="min-w-0"><div className="font-bold text-sm break-words">{product.specifications.topSpeed}</div><div className="text-xs text-gray-500">Top Speed</div></div>
                </div>
              )}
              {product.specifications?.range && (
                  <div className="flex min-w-0 items-center gap-2 bg-[#f8fff0] rounded-xl p-3">
                  <FaBatteryFull className="text-[#5FAF00]" size={18} />
                  <div className="min-w-0"><div className="font-bold text-sm break-words">{product.specifications.range}</div><div className="text-xs text-gray-500">Range</div></div>
                </div>
              )}
              {product.specifications?.chargingTime && (
                  <div className="flex min-w-0 items-center gap-2 bg-[#f8fff0] rounded-xl p-3">
                  <FaBolt className="text-[#5FAF00]" size={18} />
                  <div className="min-w-0"><div className="font-bold text-sm break-words">{product.specifications.chargingTime}</div><div className="text-xs text-gray-500">Charging Time</div></div>
                </div>
              )}
              {product.specifications?.warranty && (
                  <div className="flex min-w-0 items-center gap-2 bg-[#f8fff0] rounded-xl p-3">
                  <FaShieldAlt className="text-[#5FAF00]" size={18} />
                  <div className="min-w-0"><div className="font-bold text-sm break-words">{product.specifications.warranty}</div><div className="text-xs text-gray-500">Warranty</div></div>
                </div>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#5FAF00]">{formatPrice(product.price)}</span>
                {product.discountPrice && (
                  <span className="text-lg text-gray-400 line-through">{formatPrice(product.discountPrice)}</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">EMI from ₹{emi.toLocaleString('en-IN')}/month* | *T&C apply</p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
                  <div className="flex flex-col gap-3 md:flex-row">
                <button onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${added ? 'bg-green-500 text-white' : 'btn-primary'}`}>
                  {added ? <><FiCheck /> Added!</> : <><FiShoppingCart /> Book Now</>}
                </button>
                <Link href="/book-test-ride" className="flex-1 btn-outline flex items-center justify-center gap-2 py-3">
                  <FiCalendar /> Test Ride
                </Link>
              </div>
                <div className="flex flex-col gap-3 md:flex-row">
                <button onClick={() => dispatch(toggleWishlist(product))}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${inWishlist ? 'border-red-500 text-red-500 bg-red-50' : 'border-[#EAEAEA] hover:border-[#5FAF00]'}`}>
                  <FiHeart fill={inWishlist ? 'currentColor' : 'none'} size={16} />
                  {inWishlist ? 'Wishlisted' : 'Add to Wishlist'}
                </button>
                {product.brochure && (
                  <a href={product.brochure} download className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-[#EAEAEA] text-sm font-semibold hover:border-[#5FAF00] transition-all">
                    <FiDownload size={16} /> Brochure
                  </a>
                )}
              </div>
            </div>

            {product.shortDescription && (
              <p className="text-gray-600 text-sm leading-relaxed">{product.shortDescription}</p>
            )}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex gap-1 border-b border-[#EAEAEA] mb-6">
            {(['specs', 'features', 'accessories'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-5 py-3 text-sm font-semibold capitalize transition-all border-b-2 -mb-px ${activeTab === tab ? 'border-[#5FAF00] text-[#5FAF00]' : 'border-transparent text-gray-500 hover:text-[#111]'}`}>
                {tab === 'specs' ? 'Specifications' : tab}
              </button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {specItems.map((spec) => (
                <div key={spec.label} className="flex min-w-0 items-start justify-between gap-3 py-3 px-4 bg-[#f8fff0] rounded-xl">
                  <span className="min-w-0 text-sm text-gray-500 font-medium break-words">{spec.label}</span>
                  <span className="min-w-0 text-right text-sm font-bold text-[#111] break-words">{spec.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {product.features?.map((feature) => (
                <div key={feature} className="flex items-center gap-2 py-3 px-4 bg-[#f8fff0] rounded-xl">
                  <FiCheck className="text-[#5FAF00] flex-shrink-0" size={16} />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'accessories' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {product.accessories?.length > 0 ? product.accessories.map((acc) => (
                <div key={acc.name} className="card-premium p-4 text-center">
                  <div className="font-semibold text-sm mb-1">{acc.name}</div>
                  <div className="text-[#5FAF00] font-bold">{formatPrice(acc.price)}</div>
                </div>
              )) : <p className="text-gray-400 col-span-4">No accessories available</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
