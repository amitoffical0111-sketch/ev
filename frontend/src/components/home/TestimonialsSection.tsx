'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { Testimonial } from '@/types';

interface Props { testimonials: Testimonial[]; }

const defaultTestimonials: Testimonial[] = [
  { _id: '1', name: 'Rahul Sharma', location: 'Delhi', rating: 5, review: 'Amazing scooter! The range is excellent and the build quality is top-notch. Highly recommend Real E Bikes.', isFeatured: true },
  { _id: '2', name: 'Priya Patel', location: 'Mumbai', rating: 5, review: 'Switched from petrol to Real E Bikes 6 months ago. Saving ₹3000+ every month on fuel. Best decision ever!', isFeatured: true },
  { _id: '3', name: 'Amit Kumar', location: 'Bangalore', rating: 4, review: 'Great performance and smooth ride. The after-sales service is excellent. Very happy with my purchase.', isFeatured: true },
  { _id: '4', name: 'Sunita Verma', location: 'Pune', rating: 5, review: 'The Real Legend DLX+ is perfect for city commuting. Zero maintenance cost and eco-friendly. Love it!', isFeatured: true },
];

export default function TestimonialsSection({ testimonials }: Props) {
  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="section bg-gradient-to-br from-[#f8fff0] to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Customer Reviews</p>
          <h2 className="text-3xl md:text-4xl font-black text-[#111]">What Our <span className="text-[#5FAF00]">Riders Say</span></h2>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12">
          {items.map((t) => (
            <SwiperSlide key={t._id}>
              <div className="card-premium p-6 h-full">
                <FaQuoteLeft className="text-[#5FAF00] opacity-30 mb-3" size={28} />
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={14} className={i < t.rating ? 'text-yellow-400' : 'text-gray-200'} />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{t.review}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#5FAF00] rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-[#111]">{t.name}</div>
                    {t.location && <div className="text-xs text-gray-400">{t.location}</div>}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
