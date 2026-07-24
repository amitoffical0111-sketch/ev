import { FiBattery, FiZap, FiShield, FiClock } from 'react-icons/fi';

const features = [
  { icon: FiBattery, title: 'Long Life Battery', desc: '2000+ charge cycles with minimal degradation' },
  { icon: FiZap, title: 'Fast Charging', desc: 'Charge from 0–80% in just 4 hours' },
  { icon: FiShield, title: 'IP67 Waterproof', desc: 'Fully sealed against dust and water' },
  { icon: FiClock, title: '5 Year Warranty', desc: 'Industry-leading battery warranty' },
];

const ringStats = [
  { label: '120+ km', sub: 'Range', angle: -60 },
  { label: '30Ah', sub: 'Capacity', angle: 60 },
  { label: '6–8 Hrs', sub: 'Charging', angle: 180 },
];

export default function BatterySection() {
  return (
    <section className="section bg-[#0a0a0a] text-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <p className="section-label">Advanced Technology</p>
            <h2 className="text-3xl md:text-[2.6rem] font-black mb-4 leading-tight">
              Next-Gen <span className="text-[#5FAF00]">Battery Technology</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8 text-[15px] max-w-lg">
              Our advanced Lithium-Ion battery packs are engineered for maximum performance, longevity, and safety. Built with BMS (Battery Management System) for optimal cell balancing and thermal management.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="bg-white/5 border border-white/8 rounded-2xl p-4 hover:border-[#5FAF00]/40 hover:bg-white/8 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 bg-[#5FAF00]/15 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#5FAF00]/25 transition-colors">
                    <f.icon size={18} className="text-[#5FAF00]" strokeWidth={2} />
                  </div>
                  <div className="font-bold text-[13px] mb-1 text-white">{f.title}</div>
                  <div className="text-[12px] text-gray-400 leading-relaxed">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="relative aspect-square h-auto w-full max-w-72 md:w-[380px] md:h-[380px] md:max-w-none md:aspect-auto">
              {/* Ping rings */}
              <div className="absolute inset-0 rounded-full border border-[#5FAF00]/15 animate-ping" style={{ animationDuration: '3.5s' }} />
              <div className="absolute inset-5 rounded-full border border-[#5FAF00]/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
              <div className="absolute inset-10 rounded-full border border-[#5FAF00]/30 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '1s' }} />

              {/* Center orb */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-36 h-36 bg-gradient-to-br from-[#5FAF00] to-[#1F7A00] rounded-full flex flex-col items-center justify-center shadow-[0_0_60px_rgba(95,175,0,0.4)]">
                  <FiBattery size={36} className="text-white mb-1.5" strokeWidth={1.5} />
                  <div className="text-white font-black text-xl leading-none">72V</div>
                  <div className="text-white/70 text-[11px] mt-0.5">Lithium-Ion</div>
                </div>
              </div>

              {/* Floating stat chips */}
              {ringStats.map((stat) => {
                const rad = (stat.angle * Math.PI) / 180;
                const r = 160;
                const x = 50 + (r / 3.2) * Math.cos(rad);
                const y = 50 + (r / 3.2) * Math.sin(rad);
                return (
                  <div
                    key={stat.label}
                    className="absolute bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 text-center"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="text-white font-black text-[13px] leading-tight">{stat.label}</div>
                    <div className="text-gray-400 text-[11px]">{stat.sub}</div>
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
