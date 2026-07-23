import { FiAward, FiBattery, FiUsers, FiMapPin, FiSmile, FiHeadphones } from 'react-icons/fi';
import { FaTachometerAlt } from 'react-icons/fa';

const stats = [
  { icon: FiAward, value: '5+', label: 'Years Warranty' },
  { icon: FiBattery, value: '50–120+', label: 'km Range' },
  { icon: FaTachometerAlt, value: '70 km/h', label: 'Top Speed' },
  { icon: FiMapPin, value: '200+', label: 'Dealers India Wide' },
  { icon: FiSmile, value: '10,000+', label: 'Happy Customers' },
  { icon: FiHeadphones, value: '24×7', label: 'Customer Support' },
];

export default function StatsSection() {
  return (
    <section className="section-sm bg-[#f6fef0]">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center gap-3 group"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-[0_2px_12px_rgba(0,0,0,0.06)] group-hover:shadow-[0_4px_20px_rgba(95,175,0,0.2)] group-hover:bg-[#5FAF00] transition-all duration-300">
                <stat.icon
                  size={22}
                  className="text-[#5FAF00] group-hover:text-white transition-colors duration-300"
                />
              </div>
              <div>
                <div className="font-black text-[22px] text-[#111] leading-tight">{stat.value}</div>
                <div className="text-[12px] text-gray-500 font-medium mt-0.5 leading-tight">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
