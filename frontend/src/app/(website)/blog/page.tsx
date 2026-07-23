'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCalendar, FiEye, FiArrowRight } from 'react-icons/fi';
import { blogsApi } from '@/lib/api';
import { Blog } from '@/types';
import { getImageUrl } from '@/lib/utils';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    blogsApi.getAll({ isPublished: 'true' } as object).then(({ data }) => {
      setBlogs(data.data || []);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-2">
            Latest <span className="text-[#5FAF00]">News & Blogs</span>
          </h1>
          <p className="text-gray-500">Stay updated with the latest in electric mobility</p>
        </div>
      </div>

      <div className="container-custom py-10">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-premium overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <motion.div key={blog._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} className="card-premium overflow-hidden group">
                <div className="relative h-48 bg-[#f8fff0] overflow-hidden">
                  {blog.image ? (
                    <Image src={getImageUrl(blog.image)} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#5FAF00] opacity-20 text-6xl font-black">REB</div>
                  )}
                  {blog.category && (
                    <span className="absolute top-3 left-3 bg-[#5FAF00] text-white text-xs font-bold px-2 py-1 rounded-lg">{blog.category}</span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    {blog.publishedAt && (
                      <span className="flex items-center gap-1"><FiCalendar size={12} /> {new Date(blog.publishedAt).toLocaleDateString('en-IN')}</span>
                    )}
                    <span className="flex items-center gap-1"><FiEye size={12} /> {blog.views} views</span>
                  </div>
                  <h3 className="font-bold text-[#111] text-base mb-2 line-clamp-2 group-hover:text-[#5FAF00] transition-colors">{blog.title}</h3>
                  {blog.excerpt && <p className="text-sm text-gray-500 line-clamp-2 mb-4">{blog.excerpt}</p>}
                  <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-[#5FAF00] hover:gap-2 transition-all">
                    Read More <FiArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No blogs published yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
