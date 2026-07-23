'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiZoomIn, FiFilter } from 'react-icons/fi';
import { galleryApi } from '@/lib/api';

const categories = ['All', 'Products', 'Events', 'Showroom', 'Team', 'Awards'];

interface GalleryItem {
  _id: string;
  url: string;
  title?: string;
  category?: string;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  useEffect(() => {
    galleryApi.getAll()
      .then(({ data }) => setItems(data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-12">
        <div className="container-custom text-center">
          <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Visual Stories</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] mb-3">Our <span className="text-[#5FAF00]">Gallery</span></h1>
          <p className="text-gray-500">Explore our collection of photos from events, products, and more</p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Category Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 justify-center">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${activeCategory === cat ? 'bg-[#5FAF00] text-white' : 'bg-white border border-[#EAEAEA] hover:border-[#5FAF00]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : filtered.length > 0 ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <motion.div key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group relative"
                onClick={() => setLightbox(item)}>
                <div className="relative bg-gradient-to-br from-[#f0f9e8] to-[#e8f5d0]" style={{ aspectRatio: i % 3 === 0 ? '1' : '4/3' }}>
                  {item.url ? (
                    <Image src={item.url} alt={item.title || 'Gallery'} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[#5FAF00]/30 font-black text-4xl">REB</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <FiZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={28} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-gray-400 text-lg">Gallery coming soon</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <FiX size={20} />
          </button>
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            {lightbox.url ? (
              <Image src={lightbox.url} alt={lightbox.title || ''} width={1200} height={800} className="object-contain rounded-2xl max-h-[90vh] w-full" />
            ) : (
              <div className="bg-[#f0f9e8] rounded-2xl aspect-video flex items-center justify-center">
                <span className="text-[#5FAF00]/30 font-black text-6xl">REB</span>
              </div>
            )}
            {lightbox.title && <p className="text-white text-center mt-3 font-medium">{lightbox.title}</p>}
          </div>
        </motion.div>
      )}
    </div>
  );
}
