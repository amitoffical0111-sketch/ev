'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import ProductCard from '@/components/products/ProductCard';
import { productsApi } from '@/lib/api';
import { Product } from '@/types';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setSearched(true);
    productsApi.getAll({ search: query, limit: '20' })
      .then(({ data }) => setProducts(data.products || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="container-custom py-10">
      {!searched ? (
        <div className="text-center py-20">
          <FiSearch size={64} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">Enter a search term to find products</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : products.length > 0 ? (
        <>
          <p className="text-gray-500 mb-6">Found <strong>{products.length}</strong> results for "<strong>{query}</strong>"</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20">
          <FiSearch size={64} className="text-gray-200 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-400 mb-2">No results found</h2>
          <p className="text-gray-400">No products found for "{query}". Try a different search term.</p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  const [input, setInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) window.location.href = `/search?q=${encodeURIComponent(input.trim())}`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom">
          <h1 className="text-3xl font-black text-[#111] mb-5">Search Products</h1>
          <form onSubmit={handleSearch} className="flex gap-3 max-w-xl">
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" value={input} onChange={e => setInput(e.target.value)}
                placeholder="Search electric scooters..."
                className="w-full pl-12 pr-4 py-3.5 border border-[#EAEAEA] rounded-2xl focus:outline-none focus:border-[#5FAF00] text-sm" />
            </div>
            <button type="submit" className="btn-primary px-6">Search</button>
          </form>
        </div>
      </div>
      <Suspense fallback={<div className="container-custom py-10"><div className="grid grid-cols-2 md:grid-cols-4 gap-5">{[...Array(8)].map((_, i) => <div key={i} className="h-64 bg-gray-100 rounded-2xl animate-pulse" />)}</div></div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
