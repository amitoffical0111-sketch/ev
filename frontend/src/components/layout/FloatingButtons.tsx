import { FaWhatsapp, FaPhone } from 'react-icons/fa';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col gap-3">
      <a href="tel:+919953667830"
        className="w-12 h-12 bg-[#5FAF00] rounded-full flex items-center justify-center shadow-lg hover:bg-[#1F7A00] hover:scale-110 transition-all"
        title="Call Us">
        <FaPhone className="text-white" size={18} />
      </a>
      <a href="https://wa.me/919953667830?text=Hi, I'm interested in Real E Bikes"
        target="_blank" rel="noopener noreferrer"
        className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all pulse-green"
        title="WhatsApp">
        <FaWhatsapp className="text-white" size={22} />
      </a>
    </div>
  );
}
