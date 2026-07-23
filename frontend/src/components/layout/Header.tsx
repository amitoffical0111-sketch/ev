'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiChevronDown, FiUser, FiCalendar } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { selectCartCount } from '@/store/slices/cartSlice';

const navLinks = [
  { label: 'Home', href: '/' },
  {
    label: 'Products', href: '/products',
    mega: [
      { label: 'RTO Approved', href: '/products?category=rto-approved', desc: 'Government approved EVs' },
      { label: 'Non-RTO', href: '/products?category=non-rto', desc: 'No license required' },
      { label: 'High Speed', href: '/products?category=high-speed', desc: 'Above 45 km/h' },
      { label: 'Low Speed', href: '/products?category=low-speed', desc: 'Up to 25 km/h' },
      { label: 'Cruiser Bikes', href: '/products?category=cruiser', desc: 'Premium cruisers' },
      { label: 'Three Wheelers', href: '/products?category=three-wheeler', desc: 'Commercial EVs' },
    ],
  },
  { label: 'Dealers', href: '/dealers' },
  { label: 'Services', href: '/service-centers' },
  {
    label: 'Company', href: '/about',
    mega: [
      { label: 'About Us', href: '/about', desc: 'Our story & mission' },
      { label: 'Gallery', href: '/gallery', desc: 'Photo & video gallery' },
      { label: 'Careers', href: '/careers', desc: 'Join our team' },
      { label: 'Awards', href: '/about#awards', desc: 'Our achievements' },
    ],
  },
  { label: 'News', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const cartCount = useSelector(selectCartCount);
  const user = useSelector((state: RootState) => state.auth.user);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="container-custom">
          <div className="flex items-center justify-between h-[72px]">

            {/* Mobile hamburger */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(true)}>
              <FiMenu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image src="/logo.png" alt="Real E Bikes" width={200} height={64} className="object-contain h-16 w-auto" priority />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-0" ref={megaRef}>
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <div key={link.label} className="relative"
                    onMouseEnter={() => link.mega && setActiveMega(link.label)}
                    onMouseLeave={() => setActiveMega(null)}>
                    <Link href={link.href}
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-semibold transition-colors hover:text-[#5FAF00] ${active ? 'text-[#5FAF00] border-b-2 border-[#5FAF00]' : 'text-[#222]'}`}>
                      {link.label}
                      {link.mega && <FiChevronDown size={13} className={`transition-transform ${activeMega === link.label ? 'rotate-180' : ''}`} />}
                    </Link>

                    <AnimatePresence>
                      {link.mega && activeMega === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-0 w-60 bg-white rounded-2xl shadow-2xl border border-[#EAEAEA] p-2 z-50">
                          {link.mega.map((item) => (
                            <Link key={item.label} href={item.href}
                              className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-[#f0f9e8] transition-colors group">
                              <span className="font-semibold text-sm text-[#111] group-hover:text-[#5FAF00]">{item.label}</span>
                              <span className="text-xs text-gray-400">{item.desc}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#222]">
                <FiSearch size={20} />
              </button>
              <Link href="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#222]">
                <FiShoppingCart size={20} />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#5FAF00] text-white text-[10px] rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                )}
              </Link>
              {mounted && user && (
                <Link href={user.role === 'admin' ? '/admin' : '/profile'} className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 text-[#222]">
                  <FiUser size={20} />
                </Link>
              )}
              <Link href="/book-test-ride"
                className="hidden md:flex items-center gap-2 ml-2 bg-[#5FAF00] hover:bg-[#4a9400] text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors">
                <FiCalendar size={15} />
                BOOK TEST RIDE
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="border-t border-[#EAEAEA] overflow-hidden">
              <div className="container-custom py-3">
                <form onSubmit={(e) => { e.preventDefault(); window.location.href = `/products?search=${searchQuery}`; }}
                  className="flex gap-2">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search electric scooters..."
                    className="flex-1 px-4 py-2.5 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" autoFocus />
                  <button type="submit" className="bg-[#5FAF00] text-white py-2.5 px-5 text-sm rounded-xl font-semibold">Search</button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Slide Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-80 bg-white z-50 md:hidden overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-[#EAEAEA]">
                <div className="flex items-center">
                <Image src="/logo.png" alt="Real E Bikes" width={140} height={48} className="object-contain h-10 w-auto" />
              </div>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100">
                  <FiX size={20} />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link href={link.href}
                      className={`block px-4 py-3 rounded-xl font-medium transition-colors ${pathname === link.href ? 'bg-[#f0f9e8] text-[#5FAF00]' : 'hover:bg-gray-50'}`}>
                      {link.label}
                    </Link>
                    {link.mega && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.mega.map((item) => (
                          <Link key={item.label} href={item.href}
                            className="block px-4 py-2 text-sm text-gray-600 rounded-lg hover:bg-[#f0f9e8] hover:text-[#5FAF00]">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
              <div className="p-4 border-t border-[#EAEAEA] space-y-3">
                <Link href="/book-test-ride" className="flex items-center justify-center gap-2 w-full bg-[#5FAF00] text-white font-bold py-3 rounded-xl">
                  <FiCalendar size={16} /> BOOK TEST RIDE
                </Link>
                <Link href="/admin/login" className="block text-center w-full border border-[#EAEAEA] py-3 rounded-xl font-medium hover:border-[#5FAF00] hover:text-[#5FAF00] transition-colors">
                  Dealer Login
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
