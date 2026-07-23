'use client';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiSliders } from 'react-icons/fi';
import ProductCard from '@/components/products/ProductCard';
import { productsApi, categoriesApi } from '@/lib/api';
import { Product, Category } from '@/types';

function ProductsContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    sort: searchParams.get('sort') || '-createdAt',
    minPrice: '',
    maxPrice: '',
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = { page: String(page), limit: '12', sort: filters.sort };
      if (filters.search) params.search = filters.search;
      if (filters.category) params['category.slug'] = filters.category;
      if (filters.minPrice) params['price[gte]'] = filters.minPrice;
      if (filters.maxPrice) params['price[lte]'] = filters.maxPrice;

      const { data } = await productsApi.getAll(params);
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } catch { setProducts([]); }
    finally { setLoading(false); }
  }, [filters, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    categoriesApi.getAll().then(({ data }) => setCategories(data.data || []));
  }, []);

  const updateFilter = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ search: '', category: '', sort: '-createdAt', minPrice: '', maxPrice: '' });
    setPage(1);
  };

  const sortOptions = [
    { value: '-createdAt', label: 'Newest First' },
    { value: 'price', label: 'Price: Low to High' },
    { value: '-price', label: 'Price: High to Low' },
    { value: '-ratings.average', label: 'Top Rated' },
    { value: '-views', label: 'Most Popular' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-2">
            Our <span className="text-[#5FAF00]">Electric Scooters</span>
          </h1>
          <p className="text-gray-500">Explore our complete range of premium electric scooters</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => updateFilter('search', e.target.value)}
              placeholder="Search electric scooters..."
              className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm"
            />
          </div>
          <select
            value={filters.sort}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="px-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm bg-white">
            {sortOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
          <button onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-3 border border-[#EAEAEA] rounded-xl hover:border-[#5FAF00] text-sm font-medium">
            <FiSliders size={16} /> Filters
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
          <button onClick={() => updateFilter('category', '')}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${!filters.category ? 'bg-[#5FAF00] text-white' : 'bg-white border border-[#EAEAEA] hover:border-[#5FAF00]'}`}>
            All
          </button>
          {categories.map(cat => (
            <button key={cat._id} onClick={() => updateFilter('category', cat.slug)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filters.category === cat.slug ? 'bg-[#5FAF00] text-white' : 'bg-white border border-[#EAEAEA] hover:border-[#5FAF00]'}`}>
              {cat.name}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {filterOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6">
              <div className="bg-[#f8fff0] rounded-2xl p-5 border border-[#EAEAEA]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-sm">Filter Products</h3>
                  <button onClick={clearFilters} className="text-xs text-[#5FAF00] font-medium flex items-center gap-1">
                    <FiX size={12} /> Clear All
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Min Price (₹)</label>
                    <input type="number" value={filters.minPrice} onChange={(e) => updateFilter('minPrice', e.target.value)}
                      placeholder="0" className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#5FAF00]" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 mb-1 block">Max Price (₹)</label>
                    <input type="number" value={filters.maxPrice} onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      placeholder="200000" className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-sm focus:outline-none focus:border-[#5FAF00]" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">Showing {products.length} of {total} products</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="card-premium overflow-hidden animate-pulse">
                <div className="h-44 bg-gray-100" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-6 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg mb-4">No products found</p>
            <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
          </div>
        )}

        {total > 12 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(Math.ceil(total / 12))].map((_, i) => (
              <button key={i} onClick={() => setPage(i + 1)}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${page === i + 1 ? 'bg-[#5FAF00] text-white' : 'border border-[#EAEAEA] hover:border-[#5FAF00]'}`}>
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading products...</div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
