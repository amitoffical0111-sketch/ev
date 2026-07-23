'use client';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';

export default function FloatingButtons() {
  return (
    <div
      className="fixed z-40 flex flex-col gap-3"
      style={{
        bottom: 'calc(24px + env(safe-area-inset-bottom))',
        right: 'calc(20px + env(safe-area-inset-right))',
      }}
    >
      <a
        href="tel:+919953667830"
        className="group w-12 h-12 bg-[#5FAF00] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(95,175,0,0.45)] hover:bg-[#4a9400] hover:shadow-[0_6px_28px_rgba(95,175,0,0.55)] hover:scale-110 active:scale-95 transition-all duration-200"
        title="Call Us"
        aria-label="Call Us"
      >
        <FaPhone className="text-white" size={17} />
      </a>
      <a
        href="https://wa.me/919953667830?text=Hi, I'm interested in Real E Bikes"
        target="_blank"
        rel="noopener noreferrer"
        className="group w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:bg-[#20b858] hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)] hover:scale-110 active:scale-95 transition-all duration-200 pulse-green"
        title="WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white" size={21} />
      </a>
    </div>
  );
}
