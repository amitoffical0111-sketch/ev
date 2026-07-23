import { FaBolt, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { MdPhone } from 'react-icons/md';

export default function TopBar() {
  return (
    <div className="bg-[#5FAF00] text-white text-xs py-2">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <FaBolt size={12} />
          <span>Ride Real. Ride Electric. Save More. Earn More.</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium">Customer Support</span>
            <a href="tel:+919953667830" className="font-bold hover:text-white/80 transition-colors">
              +91 99536 67830
            </a>
          </div>
          <div className="flex items-center gap-3 border-l border-white/30 pl-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors"><FaFacebook size={14} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors"><FaInstagram size={14} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors"><FaYoutube size={14} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white/70 transition-colors"><FaLinkedin size={14} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
