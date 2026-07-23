'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSearch } from 'react-icons/fi';
import { faqsApi } from '@/lib/api';
import { FAQ } from '@/types';

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filtered, setFiltered] = useState<FAQ[]>([]);
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    faqsApi.getAll().then(({ data }) => {
      setFaqs(data.data || []);
      setFiltered(data.data || []);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!search) { setFiltered(faqs); return; }
    const q = search.toLowerCase();
    setFiltered(faqs.filter(f => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)));
  }, [search, faqs]);

  const categories = [...new Set(faqs.map(f => f.category))];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom text-center">
          <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-2">
            Frequently Asked <span className="text-[#5FAF00]">Questions</span>
          </h1>
          <p className="text-gray-500 mb-6">Find answers to common questions about our electric scooters</p>
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
          </div>
        </div>
      </div>

      <div className="container-custom py-10 max-w-3xl">
        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-14 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="space-y-3">
            {filtered.map((faq) => (
              <div key={faq._id} className="border border-[#EAEAEA] rounded-2xl overflow-hidden">
                <button onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f8fff0] transition-colors">
                  <span className="font-semibold text-sm text-[#111] pr-4">{faq.question}</span>
                  <motion.div animate={{ rotate: openId === faq._id ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <FiChevronDown size={18} className="text-[#5FAF00] flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openId === faq._id && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      transition={{ duration: 0.2 }} className="overflow-hidden">
                      <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-[#EAEAEA] pt-3">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p>No FAQs found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
