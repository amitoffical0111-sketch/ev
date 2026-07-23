'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiClock, FiSearch, FiTool } from 'react-icons/fi';
import api from '@/lib/api';

interface ServiceCenter {
  _id: string;
  name: string;
  address: { street?: string; city?: string; state?: string; pincode?: string };
  phone: string;
  email?: string;
  workingHours?: string;
  services?: string[];
  isActive: boolean;
}

const defaultCenters: ServiceCenter[] = [
  { _id: '1', name: 'Real E Bikes Service - Delhi', address: { street: 'Sector 18', city: 'Noida', state: 'Uttar Pradesh', pincode: '201301' }, phone: '+91 98765 43210', workingHours: 'Mon-Sat: 9AM-7PM', services: ['Battery Service', 'Motor Repair', 'General Service', 'Warranty Claims'], isActive: true },
  { _id: '2', name: 'Real E Bikes Service - Mumbai', address: { street: 'Andheri West', city: 'Mumbai', state: 'Maharashtra', pincode: '400053' }, phone: '+91 98765 43211', workingHours: 'Mon-Sat: 9AM-7PM', services: ['Battery Service', 'Motor Repair', 'General Service'], isActive: true },
  { _id: '3', name: 'Real E Bikes Service - Bangalore', address: { street: 'Koramangala', city: 'Bangalore', state: 'Karnataka', pincode: '560034' }, phone: '+91 98765 43212', workingHours: 'Mon-Sat: 9AM-7PM', services: ['Battery Service', 'General Service', 'Accessories'], isActive: true },
  { _id: '4', name: 'Real E Bikes Service - Pune', address: { street: 'Kothrud', city: 'Pune', state: 'Maharashtra', pincode: '411038' }, phone: '+91 98765 43213', workingHours: 'Mon-Sat: 9AM-6PM', services: ['Battery Service', 'Motor Repair', 'General Service'], isActive: true },
  { _id: '5', name: 'Real E Bikes Service - Hyderabad', address: { street: 'Banjara Hills', city: 'Hyderabad', state: 'Telangana', pincode: '500034' }, phone: '+91 98765 43214', workingHours: 'Mon-Sat: 9AM-7PM', services: ['Battery Service', 'General Service'], isActive: true },
  { _id: '6', name: 'Real E Bikes Service - Chennai', address: { street: 'Anna Nagar', city: 'Chennai', state: 'Tamil Nadu', pincode: '600040' }, phone: '+91 98765 43215', workingHours: 'Mon-Sat: 9AM-7PM', services: ['Battery Service', 'Motor Repair', 'General Service', 'Warranty Claims'], isActive: true },
];

export default function ServiceCentersPage() {
  const [centers, setCenters] = useState<ServiceCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/service-centers')
      .then(({ data }) => setCenters(data.data?.length ? data.data : defaultCenters))
      .catch(() => setCenters(defaultCenters))
      .finally(() => setLoading(false));
  }, []);

  const filtered = centers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.address.city?.toLowerCase().includes(search.toLowerCase()) ||
    c.address.state?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-12">
        <div className="container-custom text-center">
          <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">We're Here For You</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] mb-3">Service <span className="text-[#5FAF00]">Centers</span></h1>
          <p className="text-gray-500 mb-6">Find the nearest Real E Bikes service center for expert maintenance and repairs</p>
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search by city or state..."
              className="w-full pl-12 pr-4 py-3.5 border border-[#EAEAEA] rounded-2xl focus:outline-none focus:border-[#5FAF00] text-sm" />
          </div>
        </div>
      </div>

      <div className="container-custom py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((center, i) => (
              <motion.div key={center._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-[#EAEAEA] rounded-2xl p-5 hover:shadow-md hover:border-[#5FAF00]/30 transition-all">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#f0f9e8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiTool className="text-[#5FAF00]" size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#111] text-sm">{center.name}</h3>
                    <p className="text-xs text-gray-500">{center.address.city}, {center.address.state}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-start gap-2 text-xs text-gray-500">
                    <FiMapPin className="text-[#5FAF00] mt-0.5 flex-shrink-0" size={13} />
                    <span>{center.address.street}, {center.address.city} - {center.address.pincode}</span>
                  </div>
                  <a href={`tel:${center.phone}`} className="flex items-center gap-2 text-xs text-gray-500 hover:text-[#5FAF00] transition-colors">
                    <FiPhone className="text-[#5FAF00]" size={13} /> {center.phone}
                  </a>
                  {center.workingHours && (
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FiClock className="text-[#5FAF00]" size={13} /> {center.workingHours}
                    </div>
                  )}
                </div>
                {center.services && (
                  <div className="flex flex-wrap gap-1">
                    {center.services.map(s => (
                      <span key={s} className="text-xs bg-[#f0f9e8] text-[#5FAF00] px-2 py-0.5 rounded-lg font-medium">{s}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No service centers found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
