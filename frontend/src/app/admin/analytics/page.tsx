'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminApi } from '@/lib/api';
import { FiTrendingUp, FiCalendar } from 'react-icons/fi';

interface AnalyticsData {
  dailyBookings: { _id: string; count: number }[];
  period: number;
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [period, setPeriod] = useState('30');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    adminApi.getAnalytics(period).then(({ data }) => setData(data)).finally(() => setLoading(false));
  }, [period]);

  const maxCount = data?.dailyBookings?.reduce((max, d) => Math.max(max, d.count), 0) || 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#111]">Analytics</h1>
          <p className="text-gray-500 text-sm">Booking trends and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <FiCalendar size={16} className="text-gray-400" />
          <select value={period} onChange={(e) => setPeriod(e.target.value)}
            className="px-4 py-2 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#EAEAEA] p-6">
        <div className="flex items-center gap-2 mb-6">
          <FiTrendingUp className="text-[#5FAF00]" size={20} />
          <h2 className="font-bold text-[#111]">Daily Bookings - Last {period} Days</h2>
        </div>

        {loading ? (
          <div className="h-48 bg-gray-50 rounded-xl animate-pulse" />
        ) : data?.dailyBookings?.length ? (
          <div className="flex items-end gap-1 h-48 overflow-x-auto pb-2">
            {data.dailyBookings.map((d, i) => (
              <motion.div key={d._id} initial={{ height: 0 }} animate={{ height: `${(d.count / maxCount) * 100}%` }}
                transition={{ delay: i * 0.02, duration: 0.4 }}
                className="flex-shrink-0 w-6 bg-[#5FAF00] rounded-t-lg relative group min-h-[4px]"
                style={{ minWidth: '20px' }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#111] text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {d._id}: {d.count}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="h-48 flex items-center justify-center text-gray-400">
            <p>No booking data for this period</p>
          </div>
        )}

        {data?.dailyBookings?.length ? (
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{data.dailyBookings[0]?._id}</span>
            <span>{data.dailyBookings[data.dailyBookings.length - 1]?._id}</span>
          </div>
        ) : null}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: 'Total Bookings', value: data?.dailyBookings?.reduce((s, d) => s + d.count, 0) || 0, color: 'text-[#5FAF00]' },
          { label: 'Average Per Day', value: data?.dailyBookings?.length ? Math.round((data.dailyBookings.reduce((s, d) => s + d.count, 0)) / data.dailyBookings.length) : 0, color: 'text-blue-500' },
          { label: 'Peak Day', value: maxCount, color: 'text-purple-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-[#EAEAEA] p-5">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">In last {period} days</p>
          </div>
        ))}
      </div>
    </div>
  );
}
