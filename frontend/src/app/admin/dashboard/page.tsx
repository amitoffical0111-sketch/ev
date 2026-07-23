'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiPackage, FiCalendar, FiUsers, FiMapPin, FiTrendingUp, FiClock, FiArrowRight } from 'react-icons/fi';
import { adminApi } from '@/lib/api';
import Link from 'next/link';

interface DashboardData {
  stats: {
    totalProducts: number;
    totalBookings: number;
    totalUsers: number;
    totalDealers: number;
    pendingBookings: number;
    todayBookings: number;
  };
  bookingsByStatus: { _id: string; count: number }[];
  topProducts: { product: { name: string }; count: number }[];
  recentBookings: {
    _id: string;
    bookingId: string;
    customer: { name: string; phone: string };
    product: { name: string };
    status: string;
    createdAt: string;
  }[];
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getDashboard()
      .then(({ data }) => setData(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const stats = data?.stats || { totalProducts: 0, totalBookings: 0, totalUsers: 0, totalDealers: 0, pendingBookings: 0, todayBookings: 0 };

  const statCards = [
    { label: 'Total Products', value: stats.totalProducts, icon: FiPackage, color: 'bg-blue-500', change: 'Active products' },
    { label: 'Total Bookings', value: stats.totalBookings, icon: FiCalendar, color: 'bg-[#5FAF00]', change: `+${stats.todayBookings} today` },
    { label: 'Customers', value: stats.totalUsers, icon: FiUsers, color: 'bg-purple-500', change: 'Registered users' },
    { label: 'Active Dealers', value: stats.totalDealers, icon: FiMapPin, color: 'bg-orange-500', change: 'Across India' },
    { label: 'Pending Bookings', value: stats.pendingBookings, icon: FiClock, color: 'bg-yellow-500', change: 'Needs attention' },
    { label: "Today's Bookings", value: stats.todayBookings, icon: FiTrendingUp, color: 'bg-pink-500', change: 'New today' },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 animate-pulse h-28" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#111]">Dashboard</h1>
          <p className="text-gray-500 text-sm">Welcome back! Here's what's happening.</p>
        </div>
        <Link href="/admin/bookings" className="btn-primary text-sm py-2 px-4">
          View Bookings <FiArrowRight size={14} />
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, i) => (
          <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl p-5 border border-[#EAEAEA] hover:shadow-md transition-shadow">
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
              <card.icon size={18} className="text-white" />
            </div>
            <div className="text-2xl font-black text-[#111]">{card.value}</div>
            <div className="text-xs font-semibold text-gray-600 mt-0.5">{card.label}</div>
            <div className="text-xs text-gray-400 mt-1">{card.change}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#EAEAEA] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#EAEAEA]">
            <h2 className="font-bold text-[#111]">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-xs text-[#5FAF00] font-medium hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Booking ID</th>
                  <th className="px-5 py-3 text-left">Customer</th>
                  <th className="px-5 py-3 text-left">Product</th>
                  <th className="px-5 py-3 text-left">Status</th>
                  <th className="px-5 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA]">
                {data?.recentBookings?.length ? data.recentBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-mono text-xs font-bold text-[#5FAF00]">{b.bookingId}</td>
                    <td className="px-5 py-3">
                      <div className="font-medium">{b.customer.name}</div>
                      <div className="text-xs text-gray-400">{b.customer.phone}</div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{b.product?.name}</td>
                    <td className="px-5 py-3">
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold capitalize ${statusColors[b.status] || 'bg-gray-100 text-gray-600'}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{new Date(b.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                )) : (
                  <tr><td colSpan={5} className="px-5 py-8 text-center text-gray-400">No bookings yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking Status + Top Products */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-[#EAEAEA] p-5">
            <h2 className="font-bold text-[#111] mb-4">Booking Status</h2>
            <div className="space-y-3">
              {data?.bookingsByStatus?.map((s) => (
                <div key={s._id} className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-lg text-xs font-semibold capitalize ${statusColors[s._id] || 'bg-gray-100 text-gray-600'}`}>{s._id}</span>
                  <span className="font-bold text-[#111]">{s.count}</span>
                </div>
              ))}
              {!data?.bookingsByStatus?.length && <p className="text-gray-400 text-sm">No data</p>}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#EAEAEA] p-5">
            <h2 className="font-bold text-[#111] mb-4">Top Products</h2>
            <div className="space-y-3">
              {data?.topProducts?.map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 truncate flex-1">{p.product?.name}</span>
                  <span className="font-bold text-[#5FAF00] ml-2">{p.count} bookings</span>
                </div>
              ))}
              {!data?.topProducts?.length && <p className="text-gray-400 text-sm">No data</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-5">
        <h2 className="font-bold text-[#111] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { label: 'Add Product', href: '/admin/products', color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
            { label: 'Add Category', href: '/admin/categories', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
            { label: 'View Bookings', href: '/admin/bookings', color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100' },
            { label: 'Add Blog', href: '/admin/blogs', color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
            { label: 'Add Dealer', href: '/admin/dealers', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
            { label: 'Site Settings', href: '/admin/settings', color: 'bg-pink-50 text-pink-600 hover:bg-pink-100' },
          ].map((action) => (
            <Link key={action.label} href={action.href}
              className={`${action.color} rounded-xl px-4 py-3 text-sm font-semibold text-center transition-colors`}>
              {action.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
