'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiArrowRight, FiClock } from 'react-icons/fi';
import api from '@/lib/api';
import { Blog } from '@/types';

const defaultNews: Blog[] = [
  { _id: '1', title: 'Real E Bikes Launches New High-Speed Model for 2025', slug: 'real-e-bikes-launches-new-high-speed-model-2025', excerpt: 'Real E Bikes unveils its most powerful electric scooter yet with 120km range and 80km/h top speed.', content: '', tags: [], isPublished: true, isFeatured: false, views: 3200, createdAt: '2025-01-20', category: 'Product Launch', publishedAt: '2025-01-20' },
  { _id: '2', title: 'Real E Bikes Expands Dealer Network to 250 Cities', slug: 'real-e-bikes-expands-dealer-network-250-cities', excerpt: 'We are proud to announce our expansion to 250 cities across India with 50 new dealer partners.', content: '', tags: [], isPublished: true, isFeatured: false, views: 1800, createdAt: '2025-01-15', category: 'Company News', publishedAt: '2025-01-15' },
  { _id: '3', title: 'Government Announces New EV Subsidies for 2025', slug: 'government-announces-new-ev-subsidies-2025', excerpt: 'The Indian government has announced enhanced subsidies under FAME III scheme benefiting EV buyers.', content: '', tags: [], isPublished: true, isFeatured: false, views: 5400, createdAt: '2025-01-10', category: 'Industry News', publishedAt: '2025-01-10' },
  { _id: '4', title: 'Real E Bikes Wins Best EV Brand Award 2024', slug: 'real-e-bikes-wins-best-ev-brand-award-2024', excerpt: 'Real E Bikes has been recognized as the Best EV Brand at the prestigious India EV Awards 2024.', content: '', tags: [], isPublished: true, isFeatured: true, views: 2100, createdAt: '2025-01-05', category: 'Awards', publishedAt: '2025-01-05' },
  { _id: '5', title: 'New Service Centers Opened in South India', slug: 'new-service-centers-opened-south-india', excerpt: 'Real E Bikes opens 10 new service centers across Tamil Nadu, Karnataka, and Andhra Pradesh.', content: '', tags: [], isPublished: true, isFeatured: false, views: 980, createdAt: '2024-12-28', category: 'Company News', publishedAt: '2024-12-28' },
  { _id: '6', title: 'Real E Bikes Partners with HDFC for Easy EV Loans', slug: 'real-e-bikes-partners-hdfc-easy-ev-loans', excerpt: 'New partnership with HDFC Bank enables customers to get EV loans at just 8.9% interest rate.', content: '', tags: [], isPublished: true, isFeatured: false, views: 1560, createdAt: '2024-12-20', category: 'Finance', publishedAt: '2024-12-20' },
];

export default function NewsPage() {
  const [news, setNews] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api.get('/news?isPublished=true&limit=20')
      .then(({ data }) => setNews(data.data?.length ? data.data : defaultNews))
      .catch(() => setNews(defaultNews))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(news.map(n => n.category).filter((c): c is string => Boolean(c))))];
  const filtered = activeCategory === 'All' ? news : news.filter(n => n.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-12">
        <div className="container-custom text-center">
          <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Stay Updated</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] mb-3">Latest <span className="text-[#5FAF00]">News</span></h1>
          <p className="text-gray-500">Stay updated with the latest news from Real E Bikes and the EV industry</p>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-[#5FAF00] text-white' : 'bg-white border border-[#EAEAEA] hover:border-[#5FAF00]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <div key={i} className="h-72 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => (
              <motion.article key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="card-premium overflow-hidden group">
                <div className="relative h-48 bg-gradient-to-br from-[#f0f9e8] to-[#e8f5d0]">
                  {item.image ? (
                    <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[#5FAF00]/20 font-black text-5xl">NEWS</span>
                    </div>
                  )}
                  {item.category && (
                    <span className="absolute top-3 left-3 bg-[#5FAF00] text-white text-xs font-bold px-2 py-1 rounded-lg">{item.category}</span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><FiCalendar size={12} /> {new Date(item.publishedAt || item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className="flex items-center gap-1"><FiClock size={12} /> 2 min read</span>
                  </div>
                  <h3 className="font-bold text-[#111] mb-2 line-clamp-2 group-hover:text-[#5FAF00] transition-colors">{item.title}</h3>
                  {item.excerpt && <p className="text-sm text-gray-500 line-clamp-2 mb-4">{item.excerpt}</p>}
                  <Link href={`/blog/${item.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-[#5FAF00] hover:gap-2 transition-all">
                    Read More <FiArrowRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
