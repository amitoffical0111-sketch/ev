'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiX, FiCheck, FiMinus, FiArrowRight } from 'react-icons/fi';
import { productsApi } from '@/lib/api';
import { Product } from '@/types';
import { formatPrice, getImageUrl } from '@/lib/utils';

const specKeys = [
  { key: 'topSpeed', label: 'Top Speed' },
  { key: 'range', label: 'Range' },
  { key: 'battery', label: 'Battery Type' },
  { key: 'batteryCapacity', label: 'Battery Capacity' },
  { key: 'chargingTime', label: 'Charging Time' },
  { key: 'motor', label: 'Motor Type' },
  { key: 'motorPower', label: 'Motor Power' },
  { key: 'brakes', label: 'Brakes' },
  { key: 'warranty', label: 'Warranty' },
];

export default function ComparePage() {
  const [products, setProducts] = useState<(Product | null)[]>([null, null, null]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [activeSlot, setActiveSlot] = useState<number | null>(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (q: string) => {
    setSearch(q);
    if (!q.trim()) { setSearchResults([]); return; }
    setSearching(true);
    try {
      const { data } = await productsApi.getAll({ search: q, limit: '5' });
      setSearchResults(data.products || []);
    } finally { setSearching(false); }
  };

  const addProduct = (product: Product, slot: number) => {
    const updated = [...products];
    updated[slot] = product;
    setProducts(updated);
    setActiveSlot(null);
    setSearch('');
    setSearchResults([]);
  };

  const removeProduct = (slot: number) => {
    const updated = [...products];
    updated[slot] = null;
    setProducts(updated);
  };

  const filled = products.filter(Boolean) as Product[];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-2">Compare <span className="text-[#5FAF00]">Scooters</span></h1>
          <p className="text-gray-500">Compare up to 3 electric scooters side by side</p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Product Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {products.map((product, slot) => (
            <div key={slot} className="relative">
              {product ? (
                <div className="bg-white border border-[#EAEAEA] rounded-2xl p-4 text-center">
                  <button onClick={() => removeProduct(slot)}
                    className="absolute top-3 right-3 w-7 h-7 bg-red-100 text-red-500 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                    <FiX size={14} />
                  </button>
                  <div className="relative h-32 mb-3">
                    <Image src={getImageUrl(product.images?.[0])} alt={product.name} fill className="object-contain" />
                  </div>
                  <h3 className="font-bold text-[#111] text-sm mb-1">{product.name}</h3>
                  <p className="text-[#5FAF00] font-black">{formatPrice(product.price)}</p>
                </div>
              ) : (
                <button onClick={() => setActiveSlot(slot)}
                  className="w-full h-48 border-2 border-dashed border-[#EAEAEA] rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-[#5FAF00] hover:bg-[#f8fff0] transition-all group">
                  <div className="w-10 h-10 bg-[#f0f9e8] rounded-xl flex items-center justify-center group-hover:bg-[#5FAF00] transition-colors">
                    <FiCheck className="text-[#5FAF00] group-hover:text-white" size={18} />
                  </div>
                  <span className="text-sm text-gray-400 font-medium">Add Scooter {slot + 1}</span>
                </button>
              )}

              {activeSlot === slot && (
                <div className="absolute top-full left-0 right-0 z-20 mt-2 bg-white border border-[#EAEAEA] rounded-2xl shadow-xl p-3">
                  <input type="text" value={search} onChange={e => handleSearch(e.target.value)}
                    placeholder="Search scooter..."
                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] mb-2" autoFocus />
                  {searching && <p className="text-xs text-gray-400 text-center py-2">Searching...</p>}
                  {searchResults.map(p => (
                    <button key={p._id} onClick={() => addProduct(p, slot)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-[#f8fff0] transition-colors text-left">
                      <div className="relative w-10 h-10 bg-[#f0f9e8] rounded-lg flex-shrink-0">
                        <Image src={getImageUrl(p.images?.[0])} alt={p.name} fill className="object-contain p-1" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#111]">{p.name}</div>
                        <div className="text-xs text-[#5FAF00] font-bold">{formatPrice(p.price)}</div>
                      </div>
                    </button>
                  ))}
                  <button onClick={() => setActiveSlot(null)} className="w-full text-xs text-gray-400 mt-2 hover:text-gray-600">Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        {filled.length >= 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#EAEAEA] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#f8fff0]">
                    <th className="px-5 py-4 text-left font-bold text-gray-500 w-40">Specification</th>
                    {products.map((p, i) => p && (
                      <th key={i} className="px-5 py-4 text-center font-bold text-[#111]">{p.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA]">
                  <tr>
                    <td className="px-5 py-3 font-semibold text-gray-500">Price</td>
                    {products.map((p, i) => p && (
                      <td key={i} className="px-5 py-3 text-center font-black text-[#5FAF00]">{formatPrice(p.price)}</td>
                    ))}
                  </tr>
                  {specKeys.map(spec => (
                    <tr key={spec.key}>
                      <td className="px-5 py-3 font-semibold text-gray-500">{spec.label}</td>
                      {products.map((p, i) => p && (
                        <td key={i} className="px-5 py-3 text-center text-[#111]">
                          {p.specifications?.[spec.key as keyof typeof p.specifications] || <FiMinus className="mx-auto text-gray-300" />}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="px-5 py-3 font-semibold text-gray-500">Action</td>
                    {products.map((p, i) => p && (
                      <td key={i} className="px-5 py-3 text-center">
                        <Link href={`/products/${p.slug}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#5FAF00] hover:underline">
                          View Details <FiArrowRight size={12} />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {filled.length < 2 && (
          <div className="text-center py-12 text-gray-400">
            <p>Add at least 2 scooters to compare</p>
          </div>
        )}
      </div>
    </div>
  );
}
