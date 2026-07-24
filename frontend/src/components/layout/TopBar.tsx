import { FaBolt, FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

export default function TopBar() {
  return (
    <div className="bg-[#5FAF00] text-white text-[12px] py-2">
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-2 font-medium">
          <FaBolt size={11} />
          <span className="tracking-wide">Ride Real. Ride Electric. Save More. Earn More.</span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white/80">Support:</span>
            <a href="tel:+91134 39514" className="font-bold hover:text-white/80 transition-colors">
              +91 91134 39514
            </a>
          </div>
          <div className="flex items-center gap-3 border-l border-white/25 pl-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white/70 transition-colors"><FaFacebook size={13} /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white/70 transition-colors"><FaInstagram size={13} /></a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-white/70 transition-colors"><FaYoutube size={13} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white/70 transition-colors"><FaLinkedin size={13} /></a>
          </div>
        </div>
      </div>
    </div>
  );
}
