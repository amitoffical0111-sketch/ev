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
    <section className="section bg-[#f8fff0]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">200+ Dealers</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#111]">
              Find a Dealer <span className="text-[#5FAF00]">Near You</span>
            </h2>
          </div>
          <Link href="/dealers" className="btn-outline text-sm self-start md:self-auto">
            View All Dealers <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {featuredDealers.map((dealer) => (
            <div key={dealer.name}
              className="bg-white rounded-2xl p-5 border border-[#EAEAEA] hover:shadow-md hover:border-[#5FAF00]/30 transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-[#f0f9e8] rounded-xl flex items-center justify-center">
                  <FiMapPin className="text-[#5FAF00]" size={18} />
                </div>
                <span className="text-xs bg-[#f0f9e8] text-[#5FAF00] font-semibold px-2 py-1 rounded-lg">{dealer.state}</span>
              </div>
              <h3 className="font-bold text-[#111] mb-1 group-hover:text-[#5FAF00] transition-colors">{dealer.name}</h3>
              <p className="text-xs text-gray-500 mb-3">{dealer.address}</p>
              <a href={`tel:${dealer.phone}`} className="flex items-center gap-1 text-sm text-gray-600 hover:text-[#5FAF00] transition-colors">
                <FiPhone size={14} /> {dealer.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#EAEAEA] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#f0f9e8] rounded-2xl flex items-center justify-center flex-shrink-0">
              <FiNavigation size={24} className="text-[#5FAF00]" />
            </div>
            <div>
              <h3 className="font-bold text-[#111] text-lg">Become a Dealer</h3>
              <p className="text-gray-500 text-sm">Join our growing network of 200+ dealers across India</p>
            </div>
          </div>
          <Link href="/dealers#become-dealer" className="btn-primary flex-shrink-0">
            Apply Now <FiArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
