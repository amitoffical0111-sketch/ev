import Link from 'next/link';
import { FiArrowRight, FiDownload, FiMapPin, FiDollarSign, FiBattery } from 'react-icons/fi';

const cards = [
  { icon: FiBattery, title: 'Battery Technology', desc: 'Advanced Lithium-ion Battery For Longer Life', cta: 'Learn More', href: '/about#battery', bg: 'from-[#5FAF00]/10 to-[#1F7A00]/5', iconBg: 'bg-[#5FAF00]' },
  { icon: FiMapPin, title: 'Find Nearest Dealer', desc: '200+ Dealers Across India', cta: 'Find Dealer', href: '/dealers', bg: 'from-blue-50 to-blue-100/50', iconBg: 'bg-blue-500' },
  { icon: FiDollarSign, title: 'Finance Partners', desc: 'Easy EMI Options Available', cta: 'View Options', href: '/finance', bg: 'from-orange-50 to-orange-100/50', iconBg: 'bg-orange-500' },
  { icon: FiDownload, title: 'Download Brochure', desc: 'Get Detailed Info About Our Scooters', cta: 'Download', href: '/downloads', bg: 'from-purple-50 to-purple-100/50', iconBg: 'bg-purple-500' },
];

export default function InfoCards() {
  return (
    <section className="section-sm bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => (
            <div key={card.title}
              className={`bg-gradient-to-br ${card.bg} rounded-3xl p-6 border border-[#EAEAEA] hover:shadow-lg transition-all group`}>
              <div className={`w-12 h-12 ${card.iconBg} rounded-2xl flex items-center justify-center mb-4`}>
                <card.icon size={22} className="text-white" />
              </div>
              <h3 className="font-bold text-[#111] text-base mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{card.desc}</p>
              <Link href={card.href} className="inline-flex items-center gap-1 text-sm font-bold text-[#5FAF00] hover:gap-2 transition-all">
                {card.cta} <FiArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
