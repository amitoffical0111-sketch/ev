'use client';
import { FiPercent } from 'react-icons/fi';

export default function AdminOffersPage() {
  return (
    <div className="flex flex-col items-center justify-center h-96 text-center">
      <div className="w-16 h-16 bg-[#f0f9e8] rounded-2xl flex items-center justify-center mb-4">
        <FiPercent size={28} className="text-[#5FAF00]" />
      </div>
      <h1 className="text-2xl font-black text-[#111] mb-2">Offers</h1>
      <p className="text-gray-400 text-sm">Offers management coming soon.</p>
    </div>
  );
}
