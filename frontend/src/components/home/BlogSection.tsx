import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiCalendar, FiClock } from 'react-icons/fi';
import { Blog } from '@/types';
import { getImageUrl } from '@/lib/utils';

const defaultBlogs: Blog[] = [
  { _id: '1', title: 'Top 5 Reasons to Switch to Electric Scooters in 2025', slug: 'top-5-reasons-switch-electric-scooters-2025', excerpt: 'Discover why thousands of Indians are making the switch to electric scooters and how it can save you money.', content: '', image: '/newsb1.png', tags: [], isPublished: true, isFeatured: false, views: 1240, createdAt: '2025-01-15', category: 'Tips & Guides', publishedAt: '2025-01-15' },
  { _id: '2', title: 'How to Maximize Your EV Battery Life', slug: 'maximize-ev-battery-life', excerpt: 'Expert tips on charging habits, storage, and maintenance to extend your electric scooter battery life.', content: '', image: '/newsb2.png', tags: [], isPublished: true, isFeatured: false, views: 980, createdAt: '2025-01-10', category: 'Maintenance', publishedAt: '2025-01-10' },
  { _id: '3', title: 'Real E Bikes Wins Best EV Brand Award 2024', slug: 'real-e-bikes-best-ev-brand-award-2024', excerpt: 'We are proud to announce that Real E Bikes has been recognized as the Best EV Brand at the India EV Awards 2024.', content: '', image: '/newsb3.png', tags: [], isPublished: true, isFeatured: true, views: 2100, createdAt: '2025-01-05', category: 'News', publishedAt: '2025-01-05' },
];

interface Props { blogs?: Blog[]; }

export default function BlogSection({ blogs = defaultBlogs }: Props) {
  const items = blogs.length > 0 ? blogs : defaultBlogs;

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Latest Updates</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#111]">
              News & <span className="text-[#5FAF00]">Insights</span>
            </h2>
          </div>
          <Link href="/blog" className="btn-outline text-sm self-start md:self-auto">
            View All Posts <FiArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((blog, index) => (
            <article key={blog._id} className="card-premium overflow-hidden group">
              <div className="relative h-48 bg-gradient-to-br from-[#f0f9e8] to-[#e8f5d0] overflow-hidden">
                {blog.image || index < 3 ? (
                  <Image src={getImageUrl(blog.image || `/newsb${index + 1}.png`)} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[#5FAF00] opacity-20 text-6xl font-black">EB</div>
                  </div>
                )}
                {blog.category && (
                  <span className="absolute top-3 left-3 bg-[#5FAF00] text-white text-xs font-bold px-2 py-1 rounded-lg">
                    {blog.category}
                  </span>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><FiCalendar size={12} /> {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><FiClock size={12} /> 3 min read</span>
                </div>
                <h3 className="font-bold text-[#111] mb-2 line-clamp-2 group-hover:text-[#5FAF00] transition-colors">{blog.title}</h3>
                {blog.excerpt && <p className="text-sm text-gray-500 line-clamp-2 mb-4">{blog.excerpt}</p>}
                <Link href={`/blog/${blog.slug}`} className="inline-flex items-center gap-1 text-sm font-bold text-[#5FAF00] hover:gap-2 transition-all">
                  Read More <FiArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
