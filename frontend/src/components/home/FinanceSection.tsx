'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import { FinancePartner } from '@/types';

const defaultPartners: FinancePartner[] = [
  { _id: '1', name: 'HDFC Bank', description: 'Easy EMI from 9.5% p.a.', interestRate: '9.5%', tenure: '12-60 months', isActive: true },
  { _id: '2', name: 'SBI Bank', description: 'Special EV loan schemes', interestRate: '8.9%', tenure: '12-84 months', isActive: true },
  { _id: '3', name: 'Bajaj Finance', description: 'No cost EMI available', interestRate: '0%', tenure: '3-24 months', isActive: true },
  { _id: '4', name: 'ICICI Bank', description: 'Instant approval online', interestRate: '10.5%', tenure: '12-60 months', isActive: true },
  { _id: '5', name: 'Axis Bank', description: 'Flexible repayment options', interestRate: '9.9%', tenure: '12-48 months', isActive: true },
];

interface Props { partners?: FinancePartner[]; }

export default function FinanceSection({ partners = defaultPartners }: Props) {
  const items = partners.length > 0 ? partners : defaultPartners;

  return (
    <section className="section-sm bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-label">Easy Finance</p>
            <h2 className="text-3xl md:text-[2.4rem] font-black text-[#111] leading-tight">
              Our <span className="text-[#5FAF00]">Finance Partners</span>
            </h2>
          </div>
          <Link href="/finance" className="btn-outline text-[13px] self-start md:self-auto">
            View All Options <FiArrowRight size={14} />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2800, disableOnInteraction: false }}
          spaceBetween={14}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {items.map((partner) => (
            <SwiperSlide key={partner._id}>
              <div className="bg-white border border-gray-100 rounded-2xl p-5 text-center hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:border-[#5FAF00]/25 transition-all duration-300 group">
                {partner.logo ? (
                  <div className="relative h-12 mb-3">
                    <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                  </div>
                ) : (
                  <div className="h-12 mb-3 flex items-center justify-center">
                    <div className="w-11 h-11 bg-[#f0f9e8] rounded-xl flex items-center justify-center group-hover:bg-[#5FAF00] transition-colors duration-300">
                      <span className="text-[#5FAF00] group-hover:text-white font-black text-[11px] transition-colors duration-300">
                        {partner.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
                <div className="font-bold text-[13px] text-[#111] mb-1 leading-tight">{partner.name}</div>
                {partner.interestRate && (
                  <div className="text-[12px] text-[#5FAF00] font-semibold">From {partner.interestRate} p.a.</div>
                )}
                {partner.description && (
                  <div className="text-[11px] text-gray-400 mt-1 leading-tight">{partner.description}</div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 bg-gradient-to-r from-[#f0f9e8] to-[#e6f7d4] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5 border border-[#5FAF00]/15">
          <div>
            <h3 className="text-[20px] font-black text-[#111] mb-1.5 leading-tight">Get Easy EMI on Your Dream EV</h3>
            <p className="text-gray-500 text-[14px]">Starting from ₹2,999/month. No hidden charges. Instant approval.</p>
          </div>
          <Link href="/finance" className="btn-primary flex-shrink-0 text-[14px]">
            Check EMI Options <FiArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
