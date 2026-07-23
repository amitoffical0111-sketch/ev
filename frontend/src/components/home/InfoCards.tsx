import Link from 'next/link';
import { FiArrowRight, FiDownload, FiMapPin, FiDollarSign, FiBattery } from 'react-icons/fi';

const cards = [
  {
    icon: FiBattery,
    title: 'Battery Technology',
    desc: 'Advanced Lithium-ion Battery For Longer Life',
    cta: 'Learn More',
    href: '/about#battery',
    bg: 'from-[#5FAF00]/8 to-[#1F7A00]/4',
    iconBg: 'bg-[#5FAF00]',
    hoverBorder: 'hover:border-[#5FAF00]/30',
  },
  {
    icon: FiMapPin,
    title: 'Find Nearest Dealer',
    desc: '200+ Dealers Across India',
    cta: 'Find Dealer',
    href: '/dealers',
    bg: 'from-blue-50 to-blue-100/40',
    iconBg: 'bg-blue-500',
    hoverBorder: 'hover:border-blue-200',
  },
  {
    icon: FiDollarSign,
    title: 'Finance Partners',
    desc: 'Easy EMI Options Available',
    cta: 'View Options',
    href: '/finance',
    bg: 'from-orange-50 to-orange-100/40',
    iconBg: 'bg-orange-500',
    hoverBorder: 'hover:border-orange-200',
  },
  {
    icon: FiDownload,
    title: 'Download Brochure',
    desc: 'Get Detailed Info About Our Scooters',
    cta: 'Download',
    href: '/downloads',
    bg: 'from-purple-50 to-purple-100/40',
    iconBg: 'bg-purple-500',
    hoverBorder: 'hover:border-purple-200',
  },
];

export default function InfoCards() {
  return (
    <section className="section-sm bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className={`bg-gradient-to-br ${card.bg} rounded-2xl p-6 border border-gray-100 ${card.hoverBorder} hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group`}
            >
              <div className={`w-11 h-11 ${card.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                <card.icon size={20} className="text-white" strokeWidth={2} />
              </div>
              <h3 className="font-bold text-[#111] text-[15px] mb-1.5 leading-snug">{card.title}</h3>
              <p className="text-[13px] text-gray-500 mb-4 leading-relaxed">{card.desc}</p>
              <Link
                href={card.href}
                className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#5FAF00] group-hover:gap-2.5 transition-all duration-200"
              >
                {card.cta} <FiArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
