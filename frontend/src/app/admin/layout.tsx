'use client';
import { useState, useEffect, useCallback, memo } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  FiHome, FiPackage, FiTag, FiUsers, FiCalendar, FiMapPin, FiImage,
  FiFileText, FiHelpCircle, FiStar, FiSettings, FiLogOut, FiMenu,
  FiBell, FiSearch, FiSun, FiMoon, FiBarChart2,
  FiBriefcase, FiDollarSign, FiVideo, FiSliders, FiTool, FiX
} from 'react-icons/fi';
import { FaBolt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import { RootState } from '@/store';
import { User } from '@/types';

const navGroups = [
  { label: 'Main', items: [{ label: 'Dashboard', href: '/admin', icon: FiHome }, { label: 'Analytics', href: '/admin/analytics', icon: FiBarChart2 }] },
  { label: 'Catalog', items: [{ label: 'Products', href: '/admin/products', icon: FiPackage }, { label: 'Categories', href: '/admin/categories', icon: FiTag }, { label: 'Hero Sliders', href: '/admin/hero-sliders', icon: FiSliders }] },
  { label: 'Business', items: [{ label: 'Bookings', href: '/admin/bookings', icon: FiCalendar }, { label: 'Orders', href: '/admin/orders', icon: FiPackage }, { label: 'Customers', href: '/admin/customers', icon: FiUsers }, { label: 'Dealers', href: '/admin/dealers', icon: FiMapPin }, { label: 'Service Centers', href: '/admin/service-centers', icon: FiTool }, { label: 'Finance Partners', href: '/admin/finance', icon: FiDollarSign }] },
  { label: 'Content', items: [{ label: 'Blogs', href: '/admin/blogs', icon: FiFileText }, { label: 'News', href: '/admin/news', icon: FiFileText }, { label: 'Gallery', href: '/admin/gallery', icon: FiImage }, { label: 'Videos', href: '/admin/videos', icon: FiVideo }, { label: 'Testimonials', href: '/admin/testimonials', icon: FiStar }, { label: 'FAQs', href: '/admin/faqs', icon: FiHelpCircle }] },
  { label: 'HR', items: [{ label: 'Careers', href: '/admin/careers', icon: FiBriefcase }] },
  { label: 'System', items: [{ label: 'Users', href: '/admin/users', icon: FiUsers }, { label: 'Settings', href: '/admin/settings', icon: FiSettings }] },
];

interface SidebarProps {
  collapsed: boolean;
  mobile?: boolean;
  pathname: string;
  user: User | null;
  onLogout: () => void;
  onClose?: () => void;
}

const Sidebar = memo(function Sidebar({ collapsed, mobile, pathname, user, onLogout, onClose }: SidebarProps) {
  return (
    <div className={`${mobile ? 'w-72' : collapsed ? 'w-[72px]' : 'w-64'} h-full flex flex-col bg-[#0f172a] text-white transition-all duration-300`}>
      <div className="flex items-center gap-3 p-4 border-b border-white/10">
        <div className="w-9 h-9 bg-[#5FAF00] rounded-xl flex items-center justify-center flex-shrink-0">
          <FaBolt size={16} className="text-white" />
        </div>
        {(!collapsed || mobile) && (
          <div className="flex-1">
            <div className="font-black text-sm leading-none">REAL E BIKES</div>
            <div className="text-[10px] text-[#5FAF00] tracking-wider">Admin Panel</div>
          </div>
        )}
        {mobile && onClose && (
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-gray-400">
            <FiX size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            {(!collapsed || mobile) && (
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-1">{group.label}</p>
            )}
            {group.items.map((item) => {
              const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all mb-0.5 ${active ? 'bg-[#5FAF00] text-white' : 'text-gray-400 hover:bg-white/10 hover:text-white'}`}>
                  <item.icon size={18} className="flex-shrink-0" />
                  {(!collapsed || mobile) && <span className="text-sm font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-white/10">
        <div className={`flex items-center gap-3 ${collapsed && !mobile ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-[#5FAF00] rounded-full flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
            {user?.name?.charAt(0) || 'A'}
          </div>
          {(!collapsed || mobile) && (
            <>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{user?.name || 'Admin'}</div>
                <div className="text-xs text-gray-400 truncate">{user?.email}</div>
              </div>
              <button onClick={onLogout} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                <FiLogOut size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (pathname === '/admin/login') return;
    const token = localStorage.getItem('token');
    if (!token) router.push('/admin/login');
  }, [pathname, router]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    router.push('/admin/login');
  }, [dispatch, router]);

  if (pathname === '/admin/login') return <>{children}</>;

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'dark bg-gray-800' : 'bg-gray-50'}`}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-shrink-0">
        <Sidebar collapsed={collapsed} pathname={pathname} user={user} onLogout={handleLogout} />
      </div>

      {/* Mobile Sidebar — CSS transition, no Framer Motion */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10">
            <Sidebar collapsed={false} mobile pathname={pathname} user={user} onLogout={handleLogout} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className={`flex items-center justify-between px-4 md:px-6 h-16 border-b ${darkMode ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-[#EAEAEA]'} flex-shrink-0`}>
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FiMenu size={20} />
            </button>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FiMenu size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
              <FiSearch size={16} className="text-gray-400" />
              <input type="text" placeholder="Search..." className="bg-transparent text-sm focus:outline-none w-48" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <FiBell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <Link href="/" target="_blank" className="hidden md:flex items-center gap-1 text-xs text-[#5FAF00] font-medium px-3 py-1.5 border border-[#5FAF00] rounded-lg hover:bg-[#f0f9e8] transition-colors">
              View Site
            </Link>
          </div>
        </header>

        <main className={`flex-1 overflow-y-auto p-4 md:p-6 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}
