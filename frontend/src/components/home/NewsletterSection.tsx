'use client';
import { useState } from 'react';
import { FiMail, FiSend, FiCheck } from 'react-icons/fi';
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
    <section className="section-sm bg-gradient-to-r from-[#1a6800] via-[#5FAF00] to-[#4a9400] relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="container-custom relative">
        <div className="text-center max-w-xl mx-auto">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5 border border-white/30">
            <FiMail size={24} className="text-white" strokeWidth={2} />
          </div>
          <h2 className="text-[2rem] md:text-[2.4rem] font-black text-white mb-3 leading-tight">Stay in the Loop</h2>
          <p className="text-white/75 mb-8 text-[15px] leading-relaxed">
            Subscribe for the latest EV news, product launches, exclusive offers, and riding tips.
          </p>

          {status === 'success' ? (
            <div className="inline-flex items-center gap-2.5 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 text-white font-semibold border border-white/30">
              <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                <FiCheck size={14} strokeWidth={3} />
              </div>
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-3.5 rounded-xl bg-white text-[#111] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50 text-[14px] font-medium shadow-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#0d0d0d] hover:bg-black text-white rounded-xl font-bold text-[14px] transition-all hover:shadow-lg disabled:opacity-70 flex-shrink-0"
              >
                {status === 'loading' ? 'Subscribing...' : <><FiSend size={14} /> Subscribe</>}
              </button>
            </form>
          )}
          <p className="text-white/50 text-[12px] mt-4">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
