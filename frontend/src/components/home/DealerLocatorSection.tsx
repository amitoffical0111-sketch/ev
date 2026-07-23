import Link from 'next/link';
import { FiMapPin, FiPhone, FiArrowRight, FiNavigation } from 'react-icons/fi';

const featuredDealers = [
  { name: 'Real E Bikes Delhi', city: 'New Delhi', state: 'Delhi', phone: '+91 98765 43210', address: 'Connaught Place, New Delhi' },
  { name: 'Real E Bikes Mumbai', city: 'Mumbai', state: 'Maharashtra', phone: '+91 98765 43211', address: 'Andheri West, Mumbai' },
  { name: 'Real E Bikes Bangalore', city: 'Bangalore', state: 'Karnataka', phone: '+91 98765 43212', address: 'Koramangala, Bangalore' },
  { name: 'Real E Bikes Pune', city: 'Pune', state: 'Maharashtra', phone: '+91 98765 43213', address: 'Kothrud, Pune' },
  { name: 'Real E Bikes Hyderabad', city: 'Hyderabad', state: 'Telangana', phone: '+91 98765 43214', address: 'Banjara Hills, Hyderabad' },
  { name: 'Real E Bikes Chennai', city: 'Chennai', state: 'Tamil Nadu', phone: '+91 98765 43215', address: 'Anna Nagar, Chennai' },
];

export default function DealerLocatorSection() {
  return (
    <section className="section bg-[#f6fef0]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-label">200+ Dealers</p>
            <h2 className="text-3xl md:text-[2.4rem] font-black text-[#111] leading-tight">
              Find a Dealer <span className="text-[#5FAF00]">Near You</span>
            </h2>
          </div>
          <Link href="/dealers" className="btn-outline text-[13px] self-start md:self-auto">
            View All Dealers <FiArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {featuredDealers.map((dealer) => (
            <div
              key={dealer.name}
              className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:border-[#5FAF00]/25 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-3.5">
                <div className="w-10 h-10 bg-[#f0f9e8] rounded-xl flex items-center justify-center group-hover:bg-[#5FAF00] transition-colors duration-300">
                  <FiMapPin className="text-[#5FAF00] group-hover:text-white transition-colors duration-300" size={17} strokeWidth={2} />
                </div>
                <span className="text-[11px] bg-[#f0f9e8] text-[#5FAF00] font-semibold px-2.5 py-1 rounded-lg">{dealer.state}</span>
              </div>
              <h3 className="font-bold text-[#111] text-[15px] mb-1 group-hover:text-[#5FAF00] transition-colors leading-snug">{dealer.name}</h3>
              <p className="text-[12px] text-gray-400 mb-3.5">{dealer.address}</p>
              <a
                href={`tel:${dealer.phone}`}
                className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-[#5FAF00] transition-colors"
              >
                <FiPhone size={13} strokeWidth={2} /> {dealer.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-5 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#f0f9e8] rounded-2xl flex items-center justify-center flex-shrink-0">
              <FiNavigation size={22} className="text-[#5FAF00]" strokeWidth={2} />
            </div>
            <div>
              <h3 className="font-bold text-[#111] text-[18px] leading-tight mb-1">Become a Dealer</h3>
              <p className="text-gray-500 text-[13px]">Join our growing network of 200+ dealers across India</p>
            </div>
          </div>
          <Link href="/dealers#become-dealer" className="btn-primary flex-shrink-0 text-[14px]">
            Apply Now <FiArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
