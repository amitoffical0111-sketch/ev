'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiHeart, FiMenu, FiX, FiChevronDown, FiUser, FiCalendar } from 'react-icons/fi';
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
  const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const cartCount = useSelector(selectCartCount);
  const wishlistCount = useSelector((state: RootState) => state.wishlist.items.length);
  const user = useSelector((state: RootState) => state.auth.user);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-300 ${
          isScrolled
            ? 'shadow-[0_2px_20px_rgba(0,0,0,0.08)] border-b border-transparent'
            : 'border-b border-gray-100/80'
        }`}
      >
        <div className="container-custom">
          <div className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center h-[68px] gap-4 min-w-0 md:flex md:justify-between">

            {/* Mobile hamburger */}
            <button
              className="md:hidden justify-self-start p-1.5 rounded-xl hover:bg-gray-100 transition-colors text-[#222] flex-shrink-0"
              onClick={() => {
                setActiveMobileMenu(null);
                setMobileOpen(true);
              }}
              aria-label="Open menu"
            >
              <FiMenu size={22} />
            </button>

            {/* Logo */}
            <Link href="/" className="justify-self-center flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Real E Bikes"
                width={180}
                height={56}
                className="object-contain h-10 max-w-[130px] w-auto md:h-[52px] md:max-w-none"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center" ref={megaRef}>
              {navLinks.map((link) => {
                const active = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.mega && setActiveMega(link.label)}
                    onMouseLeave={() => setActiveMega(null)}
                  >
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 px-3.5 py-2 text-[13.5px] font-semibold transition-colors rounded-lg hover:text-[#5FAF00] hover:bg-[#f0f9e8]/60 ${
                        active ? 'text-[#5FAF00]' : 'text-[#333]'
                      }`}
                    >
                      {link.label}
                      {link.mega && (
                        <FiChevronDown
                          size={12}
                          className={`transition-transform duration-200 ${activeMega === link.label ? 'rotate-180' : ''}`}
                        />
                      )}
                    </Link>

                    {/* Active indicator */}
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#5FAF00] rounded-full" />
                    )}

                    <AnimatePresence>
                      {link.mega && activeMega === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.15, ease: 'easeOut' }}
                          className="absolute top-full left-0 mt-1.5 w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 p-1.5 z-50"
                        >
                          {link.mega.map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-[#f0f9e8] transition-colors group"
                            >
                              <span className="font-semibold text-[13px] text-[#111] group-hover:text-[#5FAF00] transition-colors">{item.label}</span>
                              <span className="text-[11px] text-gray-400 mt-0.5">{item.desc}</span>
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
            <div className="justify-self-end ml-auto flex min-w-0 items-center gap-0 md:ml-0 md:gap-0.5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 md:p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-[#444]"
                aria-label="Search"
              >
                <FiSearch size={19} />
              </button>

              <Link
                href="/cart"
                className="relative p-2 md:p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-[#444]"
                aria-label="Cart"
              >
                <FiShoppingCart size={19} />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#5FAF00] text-white text-[10px] rounded-full flex items-center justify-center font-bold px-1 leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                href="/wishlist"
                className="relative p-2 md:p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-[#444]"
                aria-label="Wishlist"
              >
                <FiHeart size={19} />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#5FAF00] text-white text-[10px] rounded-full flex items-center justify-center font-bold px-1 leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {mounted && user && (
                <Link
                  href={user.role === 'admin' ? '/admin' : '/profile'}
                  className="hidden md:flex p-2.5 rounded-xl hover:bg-gray-100 transition-colors text-[#444]"
                  aria-label="Profile"
                >
                  <FiUser size={19} />
                </Link>
              )}

              <Link
                href="/book-test-ride"
                className="hidden md:flex items-center gap-2 ml-2 bg-[#5FAF00] hover:bg-[#4a9400] active:bg-[#3d7a00] text-white text-[13px] font-bold px-4 py-2.5 rounded-xl transition-all hover:shadow-[0_4px_16px_rgba(95,175,0,0.4)] hover:-translate-y-px"
              >
                <FiCalendar size={14} />
                Book Test Ride
              </Link>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="border-t border-gray-100 overflow-hidden"
            >
              <div className="container-custom py-3">
                <form
                  onSubmit={(e) => { e.preventDefault(); window.location.href = `/products?search=${searchQuery}`; }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search electric scooters..."
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5FAF00] focus:ring-2 focus:ring-[#5FAF00]/10 text-sm transition-all"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-[#5FAF00] hover:bg-[#4a9400] text-white py-2.5 px-5 text-sm rounded-xl font-semibold transition-colors"
                  >
                    Search
                  </button>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
              className="fixed left-0 top-0 h-[100vh] max-h-[100vh] w-[300px] bg-white z-50 md:hidden overflow-y-auto overscroll-contain shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <Image src="/logo.png" alt="Real E Bikes" width={140} height={44} className="object-contain h-10 w-auto" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  aria-label="Close menu"
                >
                  <FiX size={20} />
                </button>
              </div>

              <nav className="p-4 space-y-0.5">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    {link.mega ? (
                      <button
                        type="button"
                        aria-expanded={activeMobileMenu === link.label}
                        onClick={() => setActiveMobileMenu((current) => current === link.label ? null : link.label)}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl font-semibold text-[14px] transition-colors ${
                          pathname === link.href
                            ? 'bg-[#f0f9e8] text-[#5FAF00]'
                            : 'text-[#333] hover:bg-gray-50'
                        }`}
                      >
                        {link.label}
                        <FiChevronDown
                          size={16}
                          className={`transition-transform duration-300 ${activeMobileMenu === link.label ? 'rotate-180' : ''}`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        className={`flex items-center px-4 py-3 rounded-xl font-semibold text-[14px] transition-colors ${
                          pathname === link.href
                            ? 'bg-[#f0f9e8] text-[#5FAF00]'
                            : 'text-[#333] hover:bg-gray-50'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                    {link.mega && (
                      <AnimatePresence initial={false}>
                        {activeMobileMenu === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28, ease: 'easeInOut' }}
                            className="ml-4 overflow-hidden"
                          >
                            <div className="mt-0.5 mb-1 space-y-0.5">
                              {link.mega.map((item) => (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  className="block px-4 py-2 text-[13px] text-gray-500 rounded-lg hover:bg-[#f0f9e8] hover:text-[#5FAF00] transition-colors"
                                >
                                  {item.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                ))}
              </nav>

              <div className="p-4 border-t border-gray-100 space-y-2.5 mt-2">
                <Link
                  href="/book-test-ride"
                  className="flex items-center justify-center gap-2 w-full bg-[#5FAF00] hover:bg-[#4a9400] text-white font-bold py-3.5 rounded-xl transition-colors text-[14px]"
                >
                  <FiCalendar size={15} /> Book Test Ride
                </Link>
                <Link
                  href="/admin/login"
                  className="block text-center w-full border border-gray-200 py-3 rounded-xl font-semibold text-[14px] text-[#444] hover:border-[#5FAF00] hover:text-[#5FAF00] transition-colors"
                >
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
