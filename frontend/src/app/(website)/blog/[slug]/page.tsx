import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiEye, FiArrowLeft, FiTag } from 'react-icons/fi';
import { Blog } from '@/types';

const ALLOWED_API_HOST = process.env.NEXT_PUBLIC_API_URL
  ? new URL(process.env.NEXT_PUBLIC_API_URL).origin
  : 'http://localhost:5000';

function safeApiUrl(path: string): string {
  const url = new URL(path, ALLOWED_API_HOST);
  if (url.origin !== ALLOWED_API_HOST) throw new Error('Invalid API URL');
  return url.toString();
}

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const safeSlug = encodeURIComponent(slug);
    const res = await fetch(safeApiUrl(`/api/blogs/${safeSlug}`), { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.blog || data.data || null;
  } catch { return null; }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#111] mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-6">The article you're looking for doesn't exist.</p>
          <Link href="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container-custom py-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#5FAF00] transition-colors mb-6">
          <FiArrowLeft size={16} /> Back to Blog
        </Link>

        <article className="max-w-3xl mx-auto">
          {blog.category && (
            <span className="inline-block bg-[#5FAF00] text-white text-xs font-bold px-3 py-1 rounded-lg mb-4">{blog.category}</span>
          )}
          <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-4">{blog.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
            <span className="flex items-center gap-1">
              <FiCalendar size={14} />
              {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1"><FiEye size={14} /> {blog.views} views</span>
            {blog.author && <span>By {typeof blog.author === 'object' ? blog.author.name : blog.author}</span>}
          </div>

          {blog.image && (
            <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden mb-8">
              <Image src={blog.image} alt={blog.title} fill className="object-cover" />
            </div>
          )}

          {blog.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed mb-6 font-medium border-l-4 border-[#5FAF00] pl-4">{blog.excerpt}</p>
          )}

          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content || '<p>Content coming soon...</p>' }} />

          {blog.tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-8 pt-6 border-t border-[#EAEAEA]">
              <FiTag className="text-gray-400" size={16} />
              {blog.tags.map(tag => (
                <span key={tag} className="text-xs bg-[#f0f9e8] text-[#5FAF00] px-3 py-1 rounded-lg font-medium">{tag}</span>
              ))}
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
