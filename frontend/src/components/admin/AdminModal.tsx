'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeMap = { sm: 'max-w-md', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl' };

export default function AdminModal({ isOpen, onClose, title, children, size = 'md' }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`fixed inset-0 z-50 flex items-center justify-center p-4`}>
            <div className={`bg-white rounded-3xl shadow-2xl w-full ${sizeMap[size]} max-h-[90vh] flex flex-col`}>
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAEAEA] flex-shrink-0">
                <h3 className="font-bold text-[#111] text-lg">{title}</h3>
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <FiX size={18} />
                </button>
              </div>
              <div className="overflow-y-auto flex-1 p-6">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
