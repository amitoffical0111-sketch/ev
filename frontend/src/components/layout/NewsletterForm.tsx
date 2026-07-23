'use client';
import { useState } from 'react';
import { FiSend, FiCheck } from 'react-icons/fi';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  if (subscribed) {
    return (
      <p className="flex items-center gap-2 text-[#5FAF00] text-[13px] font-semibold">
        <FiCheck size={14} strokeWidth={3} /> Subscribed successfully!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 min-w-0 px-3 py-2.5 bg-white/8 border border-white/15 rounded-xl text-[13px] text-white placeholder-gray-500 focus:outline-none focus:border-[#5FAF00]/60 transition-colors"
      />
      <button
        type="submit"
        className="p-2.5 bg-[#5FAF00] rounded-xl hover:bg-[#4a9400] transition-colors flex-shrink-0"
        aria-label="Subscribe"
      >
        <FiSend size={15} className="text-white" />
      </button>
    </form>
  );
}
