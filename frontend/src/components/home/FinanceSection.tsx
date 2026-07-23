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
            <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Easy Finance</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#111]">
              Our <span className="text-[#5FAF00]">Finance Partners</span>
            </h2>
          </div>
          <Link href="/finance" className="btn-outline text-sm self-start md:self-auto">
            View All Options <FiArrowRight />
          </Link>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={16}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}>
          {items.map((partner) => (
            <SwiperSlide key={partner._id}>
              <div className="bg-white border border-[#EAEAEA] rounded-2xl p-5 text-center hover:shadow-md hover:border-[#5FAF00]/30 transition-all group">
                {partner.logo ? (
                  <div className="relative h-12 mb-3">
                    <Image src={partner.logo} alt={partner.name} fill className="object-contain" />
                  </div>
                ) : (
                  <div className="h-12 mb-3 flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#f0f9e8] rounded-xl flex items-center justify-center">
                      <span className="text-[#5FAF00] font-black text-xs">{partner.name.slice(0, 2)}</span>
                    </div>
                  </div>
                )}
                <div className="font-bold text-sm text-[#111] mb-1">{partner.name}</div>
                {partner.interestRate && <div className="text-xs text-[#5FAF00] font-semibold">From {partner.interestRate} p.a.</div>}
                {partner.description && <div className="text-xs text-gray-400 mt-1">{partner.description}</div>}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 bg-gradient-to-r from-[#f0f9e8] to-[#e8f5d0] rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-[#111] mb-1">Get Easy EMI on Your Dream EV</h3>
            <p className="text-gray-600 text-sm">Starting from ₹2,999/month. No hidden charges. Instant approval.</p>
          </div>
          <Link href="/finance" className="btn-primary flex-shrink-0">
            Check EMI Options <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
