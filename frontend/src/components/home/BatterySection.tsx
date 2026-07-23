import { FiBattery, FiZap, FiShield, FiClock } from 'react-icons/fi';

const features = [
  { icon: FiBattery, title: 'Long Life Battery', desc: '2000+ charge cycles with minimal degradation' },
  { icon: FiZap, title: 'Fast Charging', desc: 'Charge from 0-80% in just 4 hours' },
  { icon: FiShield, title: 'IP67 Waterproof', desc: 'Fully sealed against dust and water' },
  { icon: FiClock, title: '5 Year Warranty', desc: 'Industry-leading battery warranty' },
];

const ringStats = [
  { label: '120+ km', sub: 'Range', angle: -60 },
  { label: '30Ah', sub: 'Capacity', angle: 60 },
  { label: '6-8 Hrs', sub: 'Charging', angle: 180 },
];

export default function BatterySection() {
  return (
    <section className="section bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-3">Advanced Technology</p>
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Next-Gen <span className="text-[#5FAF00]">Battery Technology</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Our advanced Lithium-Ion battery packs are engineered for maximum performance, longevity, and safety. Built with BMS (Battery Management System) for optimal cell balancing and thermal management.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-[#5FAF00]/50 transition-colors">
                  <f.icon size={22} className="text-[#5FAF00] mb-2" />
                  <div className="font-bold text-sm mb-1">{f.title}</div>
                  <div className="text-xs text-gray-400">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full border-2 border-[#5FAF00]/20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-4 rounded-full border-2 border-[#5FAF00]/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />
              <div className="absolute inset-8 rounded-full border-2 border-[#5FAF00]/40 animate-ping" style={{ animationDuration: '2s', animationDelay: '1s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-gradient-to-br from-[#5FAF00] to-[#1F7A00] rounded-full flex flex-col items-center justify-center shadow-2xl shadow-[#5FAF00]/30">
                  <FiBattery size={40} className="text-white mb-2" />
                  <div className="text-white font-black text-xl">72V</div>
                  <div className="text-white/80 text-xs">Lithium-Ion</div>
                </div>
              </div>
              {ringStats.map((stat) => {
                const rad = (stat.angle * Math.PI) / 180;
                const r = 160;
                const x = 50 + (r / 3.2) * Math.cos(rad);
                const y = 50 + (r / 3.2) * Math.sin(rad);
                return (
                  <div key={stat.label} className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-center"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                    <div className="text-white font-black text-sm">{stat.label}</div>
                    <div className="text-gray-400 text-xs">{stat.sub}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
