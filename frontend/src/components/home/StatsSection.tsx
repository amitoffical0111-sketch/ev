import { FiAward, FiBattery, FiUsers, FiMapPin, FiSmile, FiHeadphones } from 'react-icons/fi';
import { FaTachometerAlt } from 'react-icons/fa';

const stats = [
  { icon: FiAward, value: '5+', label: 'Years Warranty' },
  { icon: FiBattery, value: '50-120+', label: 'km Range' },
  { icon: FaTachometerAlt, value: '70 km/h', label: 'Top Speed' },
  { icon: FiMapPin, value: '200+', label: 'Dealers India Wide' },
  { icon: FiSmile, value: '10000+', label: 'Happy Customers' },
  { icon: FiHeadphones, value: '24x7', label: 'Customer Support' },
];

export default function StatsSection() {
  return (
    <section className="section-sm bg-[#f8fff0]">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                <stat.icon size={22} className="text-[#5FAF00]" />
              </div>
              <div className="font-black text-xl text-[#111]">{stat.value}</div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
