'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiSearch, FiClock } from 'react-icons/fi';
import { FaCheckCircle } from 'react-icons/fa';
import { dealersApi } from '@/lib/api';
import { Dealer } from '@/types';
import Link from 'next/link';

export default function DealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Dealer[]>([]);

  useEffect(() => {
    dealersApi.getAll().then(({ data }) => {
      setDealers(data.dealers || []);
      setFiltered(data.dealers || []);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search) { setFiltered(dealers); return; }
    const q = search.toLowerCase();
    setFiltered(dealers.filter(d =>
      d.name.toLowerCase().includes(q) ||
      d.address?.city?.toLowerCase().includes(q) ||
      d.address?.state?.toLowerCase().includes(q)
    ));
  }, [search, dealers]);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-2">
            Find a <span className="text-[#5FAF00]">Dealer</span>
          </h1>
          <p className="text-gray-500">200+ authorized dealers across India</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by city, state or dealer name..."
              className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
          </div>
          <Link href="/dealers/apply" className="btn-primary">Become a Dealer</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-premium p-5 animate-pulse">
                <div className="h-5 bg-gray-100 rounded w-3/4 mb-3" />
                <div className="h-4 bg-gray-100 rounded w-1/2 mb-2" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((dealer, i) => (
              <motion.div key={dealer._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }} className="card-premium p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-[#111] text-base">{dealer.name}</h3>
                    {dealer.isVerified && (
                      <span className="flex items-center gap-1 text-xs text-[#5FAF00] font-medium mt-0.5">
                        <FaCheckCircle size={10} /> Verified Dealer
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  {dealer.address?.city && (
                    <div className="flex items-start gap-2">
                      <FiMapPin className="text-[#5FAF00] mt-0.5 flex-shrink-0" size={14} />
                      <span>{[dealer.address.street, dealer.address.city, dealer.address.state, dealer.address.pincode].filter(Boolean).join(', ')}</span>
                    </div>
                  )}
                  <a href={`tel:${dealer.phone}`} className="flex items-center gap-2 hover:text-[#5FAF00] transition-colors">
                    <FiPhone className="text-[#5FAF00]" size={14} /> {dealer.phone}
                  </a>
                  {dealer.email && (
                    <a href={`mailto:${dealer.email}`} className="flex items-center gap-2 hover:text-[#5FAF00] transition-colors">
                      <FiMail className="text-[#5FAF00]" size={14} /> {dealer.email}
                    </a>
                  )}
                  {dealer.workingHours && (
                    <div className="flex items-center gap-2">
                      <FiClock className="text-[#5FAF00]" size={14} /> {dealer.workingHours}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <FiMapPin size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg">No dealers found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
