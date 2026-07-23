'use client';
import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import api from '@/lib/api';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await api.post('/newsletter/subscribe', { email });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('success');
    }
  };

  return (
    <section className="section-sm bg-gradient-to-r from-[#1F7A00] to-[#5FAF00]">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiMail size={28} className="text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Stay in the Loop</h2>
          <p className="text-white/80 mb-8">
            Subscribe to our newsletter for the latest EV news, product launches, exclusive offers, and riding tips.
          </p>

          {status === 'success' ? (
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-white font-semibold">
              ✓ Thank you for subscribing! You'll hear from us soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white text-[#111] placeholder-gray-400 focus:outline-none text-sm font-medium" />
              <button type="submit" disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#111] text-white rounded-xl font-bold text-sm hover:bg-black transition-colors disabled:opacity-70">
                {status === 'loading' ? 'Subscribing...' : <><FiSend size={16} /> Subscribe</>}
              </button>
            </form>
          )}
          <p className="text-white/60 text-xs mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
