'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { blogsApi } from '@/lib/api';
import { Blog } from '@/types';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Blog | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const loadBlogs = async () => {
    setLoading(true);
    const { data } = await blogsApi.getAll();
    setBlogs(data.data || []);
    setLoading(false);
  };

  useEffect(() => { loadBlogs(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (b: Blog) => {
    setEditing(b);
    reset({ title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content, category: b.category, isPublished: b.isPublished, isFeatured: b.isFeatured });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!data.slug) data.slug = String(data.title).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (data.isPublished) data.publishedAt = new Date().toISOString();
    if (editing) await blogsApi.update(editing._id, data);
    else await blogsApi.create(data);
    setModalOpen(false);
    loadBlogs();
  };

  const handleDelete = async (b: Blog) => { await blogsApi.delete(b._id); loadBlogs(); };

  const columns = [
    { key: 'title', label: 'Title', render: (b: Blog) => <span className="font-semibold text-sm line-clamp-1">{b.title}</span> },
    { key: 'category', label: 'Category', render: (b: Blog) => <span className="text-xs text-gray-500">{b.category || '-'}</span> },
    { key: 'views', label: 'Views', render: (b: Blog) => <span className="text-sm">{b.views}</span> },
    {
      key: 'isPublished', label: 'Status',
      render: (b: Blog) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${b.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
          {b.isPublished ? 'Published' : 'Draft'}
        </span>
      ),
    },
    { key: 'createdAt', label: 'Created', render: (b: Blog) => <span className="text-xs text-gray-400">{new Date(b.createdAt).toLocaleDateString('en-IN')}</span> },
  ];

  return (
    <>
      <AdminTable title="Blogs & News" data={blogs} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Blog" total={blogs.length} />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Blog' : 'Add Blog'} size="xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Title *</label>
            <input {...register('title', { required: true })} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Slug</label>
              <input {...register('slug')} placeholder="auto-generated" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Category</label>
              <input {...register('category')} placeholder="e.g. EV News" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Excerpt</label>
            <textarea {...register('excerpt')} rows={2} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Content *</label>
            <textarea {...register('content', { required: true })} rows={8} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" {...register('isPublished')} className="w-4 h-4 accent-[#5FAF00]" /> Publish
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 accent-[#5FAF00]" /> Featured
            </label>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">{editing ? 'Update' : 'Add'} Blog</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
