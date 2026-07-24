'use client';
import { useState } from 'react';
import { FaWhatsapp, FaPhone } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

export default function FloatingButtons() {
  const [showCallLabel, setShowCallLabel] = useState(true);
  const [showWhatsAppLabel, setShowWhatsAppLabel] = useState(true);

  return (
    <>
      <div
        className="fixed z-40 flex md:hidden flex-col items-end gap-4"
        style={{
          bottom: 'calc(24px + env(safe-area-inset-bottom))',
          right: 'calc(16px + env(safe-area-inset-right))',
          maxWidth: 'calc(100vw - 32px)',
        }}
      >
        <div className="flex min-h-12 items-center justify-end gap-2.5">
          <AnimatePresence initial={false}>
            {showCallLabel && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex max-w-[calc(100vw-96px)] items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_4px_18px_rgba(0,0,0,0.14)]"
              >
                <div>
                  <p className="text-[11px] font-semibold leading-tight text-[#222]">Click to Call</p>
                  <p className="text-[10px] leading-tight text-gray-500">Mon-Sat, 9 AM-7 PM</p>
                </div>
                <button type="button" onClick={() => setShowCallLabel(false)} className="text-gray-400 transition-colors hover:text-gray-700" aria-label="Close call label">
                  <FiX size={13} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href="tel:+919113439514"
            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#79c51a] to-[#4a9400] text-white shadow-[0_4px_20px_rgba(95,175,0,0.45)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_28px_rgba(95,175,0,0.55)] active:scale-95"
            title="Call Us"
            aria-label="Call Us"
          >
            <FaPhone size={17} />
          </a>
        </div>

        <div className="flex min-h-12 items-center justify-end gap-2.5">
          <AnimatePresence initial={false}>
            {showWhatsAppLabel && (
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="flex max-w-[calc(100vw-96px)] items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-[0_4px_18px_rgba(0,0,0,0.14)]"
              >
                <p className="text-[11px] font-semibold leading-tight text-[#222]">Chat with us</p>
                <button type="button" onClick={() => setShowWhatsAppLabel(false)} className="text-gray-400 transition-colors hover:text-gray-700" aria-label="Close WhatsApp label">
                  <FiX size={13} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          <a
            href="https://wa.me/919113439514?text=Hi, I'm interested in Real E Bikes"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#43e77d] to-[#20b858] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)] active:scale-95 pulse-green"
            title="WhatsApp"
            aria-label="Chat on WhatsApp"
          >
            <FaWhatsapp size={21} />
          </a>
        </div>
      </div>
      <div
        className="fixed z-40 hidden lg:flex flex-col gap-3"
        style={{
          bottom: '24px',
          right: '24px',
        }}
      >
        <a
          href="tel:+919113439514"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#79c51a] to-[#4a9400] text-white shadow-[0_4px_20px_rgba(95,175,0,0.45)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_28px_rgba(95,175,0,0.55)] active:scale-95"
          title="Call Us"
          aria-label="Call Us"
        >
          <FaPhone size={17} />
        </a>
        <a
          href="https://wa.me/919113439514?text=Hi, I'm interested in Real E Bikes"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#43e77d] to-[#20b858] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] transition-all duration-200 hover:scale-110 hover:shadow-[0_6px_28px_rgba(37,211,102,0.55)] active:scale-95 pulse-green"
          title="WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp size={21} />
        </a>
      </div>
    </>
  );
}
