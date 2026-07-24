'use client';
import { useState } from 'react';
import { FiSend } from 'react-icons/fi';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  if (subscribed) return <p className="text-[#5FAF00] text-sm font-medium">✓ Subscribed successfully!</p>;

  return (
    <form onSubmit={handleSubscribe} className="flex gap-2">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#5FAF00]" />
      <button type="submit" className="p-2 bg-[#5FAF00] rounded-lg hover:bg-[#1F7A00] transition-colors">
        <FiSend size={16} className="text-white" />
      </button>
    </form>
  );
}
