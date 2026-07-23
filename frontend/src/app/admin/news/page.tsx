'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import api from '@/lib/api';

interface News {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  isPublished: boolean;
  views: number;
  createdAt: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<News | null>(null);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchNews = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/news');
      setNews(data.data || []);
    } catch { setNews([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchNews(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (n: News) => {
    setEditing(n);
    reset({ title: n.title, category: n.category, isPublished: n.isPublished });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      if (editing) await api.put(`/news/${editing._id}`, data);
      else await api.post('/news', data);
      setModalOpen(false);
      fetchNews();
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (n: News) => {
    await api.delete(`/news/${n._id}`);
    fetchNews();
  };

  const columns = [
    { key: 'title', label: 'Title', render: (n: News) => <span className="font-semibold text-sm line-clamp-1">{n.title}</span> },
    { key: 'category', label: 'Category', render: (n: News) => (
      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">{n.category || 'General'}</span>
    )},
    { key: 'views', label: 'Views', render: (n: News) => <span className="text-sm">{n.views}</span> },
    { key: 'isPublished', label: 'Status', render: (n: News) => (
      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${n.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {n.isPublished ? 'Published' : 'Draft'}
      </span>
    )},
    { key: 'createdAt', label: 'Date', render: (n: News) => <span className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleDateString('en-IN')}</span> },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]">News</h1>
        <p className="text-gray-500 text-sm">Manage news articles</p>
      </div>
      <AdminTable title="News" data={news} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add News" />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit News' : 'Add News'} size="xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Title *</label>
            <input {...register('title', { required: true })} placeholder="News title"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Category</label>
              <select {...register('category')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
                <option value="">Select category</option>
                {['Product Launch', 'Company News', 'Industry News', 'Awards', 'Finance', 'Events'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Image URL</label>
              <input {...register('image')} placeholder="https://..."
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Excerpt</label>
            <textarea {...register('excerpt')} rows={2} placeholder="Short summary..."
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Content *</label>
            <textarea {...register('content', { required: true })} rows={6} placeholder="Full news content..."
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('isPublished')} className="w-4 h-4 accent-[#5FAF00]" /> Published
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3">
              {saving ? 'Saving...' : editing ? 'Update News' : 'Add News'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
