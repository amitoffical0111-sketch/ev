'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiFileText, FiFile, FiSearch } from 'react-icons/fi';
import api from '@/lib/api';

interface Download {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize?: string;
  category: string;
  isActive: boolean;
}

const defaultDownloads: Download[] = [
  { _id: '1', title: 'Real Legend DLX+ Brochure', description: 'Complete product brochure with specifications and features', fileUrl: '#', fileType: 'PDF', fileSize: '2.4 MB', category: 'Brochures', isActive: true },
  { _id: '2', title: 'Real Cruiser Pro Brochure', description: 'Detailed brochure for our premium cruiser model', fileUrl: '#', fileType: 'PDF', fileSize: '3.1 MB', category: 'Brochures', isActive: true },
  { _id: '3', title: 'User Manual - All Models', description: 'Comprehensive user manual for all Real E Bikes models', fileUrl: '#', fileType: 'PDF', fileSize: '8.5 MB', category: 'Manuals', isActive: true },
  { _id: '4', title: 'Warranty Card Template', description: 'Download and fill your warranty registration card', fileUrl: '#', fileType: 'PDF', fileSize: '0.5 MB', category: 'Warranty', isActive: true },
  { _id: '5', title: 'Dealer Application Form', description: 'Apply to become an authorized Real E Bikes dealer', fileUrl: '#', fileType: 'PDF', fileSize: '0.8 MB', category: 'Dealer', isActive: true },
  { _id: '6', title: 'Service Schedule Chart', description: 'Recommended service intervals and maintenance checklist', fileUrl: '#', fileType: 'PDF', fileSize: '1.2 MB', category: 'Service', isActive: true },
];

const categoryColors: Record<string, string> = {
  Brochures: 'bg-blue-50 text-blue-600',
  Manuals: 'bg-green-50 text-green-600',
  Warranty: 'bg-yellow-50 text-yellow-600',
  Dealer: 'bg-purple-50 text-purple-600',
  Service: 'bg-orange-50 text-orange-600',
};

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    api.get('/downloads')
      .then(({ data }) => setDownloads(data.data?.length ? data.data : defaultDownloads))
      .catch(() => setDownloads(defaultDownloads))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(downloads.map(d => d.category)))];
  const filtered = downloads.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-12">
        <div className="container-custom text-center">
          <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Resources</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] mb-3">Downloads & <span className="text-[#5FAF00]">Resources</span></h1>
          <p className="text-gray-500 mb-6">Download brochures, manuals, and other resources</p>
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search downloads..."
              className="w-full pl-12 pr-4 py-3.5 border border-[#EAEAEA] rounded-2xl focus:outline-none focus:border-[#5FAF00] text-sm" />
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-[#EAEAEA] rounded-2xl p-5 hover:shadow-md hover:border-[#5FAF00]/30 transition-all group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#f0f9e8] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FiFileText className="text-[#5FAF00]" size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-[#111] text-sm group-hover:text-[#5FAF00] transition-colors">{item.title}</h3>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-lg flex-shrink-0 ${categoryColors[item.category] || 'bg-gray-50 text-gray-600'}`}>
                        {item.category}
                      </span>
                    </div>
                    {item.description && <p className="text-xs text-gray-500 mb-3">{item.description}</p>}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <FiFile size={12} /> {item.fileType}
                        {item.fileSize && <span>· {item.fileSize}</span>}
                      </div>
                      <a href={item.fileUrl} download
                        className="flex items-center gap-1 text-xs font-bold text-[#5FAF00] hover:text-[#1F7A00] transition-colors">
                        <FiDownload size={14} /> Download
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <FiDownload size={48} className="text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400">No downloads found</p>
          </div>
        )}
      </div>
    </div>
  );
}
