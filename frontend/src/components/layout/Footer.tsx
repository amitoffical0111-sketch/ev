import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { MdPhone, MdEmail, MdLocationOn, MdAccessTime } from 'react-icons/md';
import NewsletterForm from './NewsletterForm';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Our Products', href: '/products' },
  { label: 'Dealership', href: '/dealers' },
  { label: 'Services', href: '/service-centers' },
  { label: 'Contact Us', href: '/contact' },
];

const customerCare = [
  { label: 'FAQ', href: '/faq' },
  { label: 'Warranty', href: '/warranty' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Return Policy', href: '/return-policy' },
];

const products = [
  { label: 'RTO Approved', href: '/products?category=rto-approved' },
  { label: 'Non-RTO', href: '/products?category=non-rto' },
  { label: 'High Speed', href: '/products?category=high-speed' },
  { label: 'Low Speed', href: '/products?category=low-speed' },
  { label: 'Cruiser Bikes', href: '/products?category=cruiser' },
];

const socials = [
  { icon: FaFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: FaYoutube, href: 'https://youtube.com', label: 'YouTube' },
  { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-gray-300">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 items-start">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-5">
              <Image
                src="/logo.png"
                alt="Real E Bikes"
                width={160}
                height={52}
                className="object-contain h-11 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-[13px] text-gray-400 leading-relaxed mb-6">
              Real E Bikes is committed to delivering high performance, eco-friendly and affordable electric mobility solutions.
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/8 rounded-xl flex items-center justify-center hover:bg-[#5FAF00] hover:scale-105 transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-5 text-[12px] uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-400 hover:text-[#5FAF00] transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold mb-5 text-[12px] uppercase tracking-widest">Products</h4>
            <ul className="space-y-3">
              {products.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-400 hover:text-[#5FAF00] transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white font-bold mb-5 text-[12px] uppercase tracking-widest">Customer Care</h4>
            <ul className="space-y-3">
              {customerCare.map(link => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-gray-400 hover:text-[#5FAF00] transition-colors hover:translate-x-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-5 text-[12px] uppercase tracking-widest">Contact Us</h4>
            <div className="space-y-3.5 mb-7">
              <div className="flex items-start gap-2.5 text-[13px] text-gray-400">
                <MdLocationOn className="text-[#5FAF00] mt-0.5 flex-shrink-0" size={15} />
                <span className="leading-relaxed">123, EV Tech Park, Noida, Uttar Pradesh - 201301</span>
              </div>
              <a
                href="tel:+919953667830"
                className="flex items-center gap-2.5 text-[13px] text-gray-400 hover:text-[#5FAF00] transition-colors"
              >
                <MdPhone className="text-[#5FAF00] flex-shrink-0" size={15} /> +91 91134 39514
              </a>
              <a
                href="mailto:info@realebikes.com"
                className="flex items-center gap-2.5 text-[13px] text-gray-400 hover:text-[#5FAF00] transition-colors"
              >
                <MdEmail className="text-[#5FAF00] flex-shrink-0" size={15} /> info@realebikes.com
              </a>
              <div className="flex items-center gap-2.5 text-[13px] text-gray-400">
                <MdAccessTime className="text-[#5FAF00] flex-shrink-0" size={15} /> Mon – Sat : 10AM – 7PM
              </div>
            </div>

            <h4 className="text-white font-bold mb-3 text-[12px] uppercase tracking-widest">Newsletter</h4>
            <p className="text-[12px] text-gray-400 mb-4 leading-relaxed">Stay updated with our latest news and offers.</p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="container-custom py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-[12px] text-gray-500">© {new Date().getFullYear()} Real E Bikes. All rights reserved.</p>
          <div className="flex items-center gap-5 text-[12px] text-gray-500">
            <Link href="/privacy-policy" className="hover:text-[#5FAF00] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#5FAF00] transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml" className="hover:text-[#5FAF00] transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
