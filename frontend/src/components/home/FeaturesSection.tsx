import { FiActivity, FiLock, FiDisc, FiRotateCcw, FiZap, FiCpu, FiShield, FiVolume2, FiTool, FiAlertCircle, FiBattery, FiAward } from 'react-icons/fi';

const features = [
  { icon: FiActivity, label: 'Self Diagnosis' },
  { icon: FiLock, label: 'Lock by Remote' },
  { icon: FiDisc, label: 'Disc Brake' },
  { icon: FiRotateCcw, label: 'Reverse Parking' },
  { icon: FiZap, label: 'Charging Port' },
  { icon: FiCpu, label: 'Fast Charging' },
  { icon: FiShield, label: 'Anti Theft Lock' },
  { icon: FiVolume2, label: 'Noise Free' },
  { icon: FiTool, label: 'Repair Switch' },
  { icon: FiAlertCircle, label: 'ABS' },
  { icon: FiBattery, label: 'Long Battery' },
  { icon: FiAward, label: '5 Yr Warranty' },
];

export default function FeaturesSection() {
  return (
    <section className="section-sm bg-white">
      <div className="container-custom">
        <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_2px_24px_rgba(0,0,0,0.05)] p-6 md:p-10">
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6">
            {features.map((feature) => (
              <div key={feature.label} className="flex flex-col items-center gap-2.5 group cursor-default">
                <div className="w-12 h-12 rounded-2xl bg-[#f0f9e8] flex items-center justify-center group-hover:bg-[#5FAF00] transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_16px_rgba(95,175,0,0.3)]">
                  <feature.icon
                    size={19}
                    className="text-[#5FAF00] group-hover:text-white transition-colors duration-300"
                    strokeWidth={2}
                  />
                </div>
                <span className="text-[10px] md:text-[11px] text-center text-gray-500 font-semibold leading-tight group-hover:text-[#5FAF00] transition-colors duration-300">
                  {feature.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
