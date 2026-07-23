'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import api from '@/lib/api';

interface Video {
  _id: string;
  title: string;
  url: string;
  thumbnail?: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Video | null>(null);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/videos');
      setVideos(data.data || []);
    } catch { setVideos([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchVideos(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (v: Video) => {
    setEditing(v);
    reset({ title: v.title, url: v.url, thumbnail: v.thumbnail, category: v.category, isActive: v.isActive });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      if (editing) await api.put(`/videos/${editing._id}`, data);
      else await api.post('/videos', data);
      setModalOpen(false);
      fetchVideos();
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (v: Video) => {
    await api.delete(`/videos/${v._id}`);
    fetchVideos();
  };

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const columns = [
    { key: 'thumbnail', label: 'Thumbnail', render: (v: Video) => {
      const ytId = getYouTubeId(v.url);
      const thumb = v.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null);
      return thumb ? (
        <img src={thumb} alt={v.title} className="w-16 h-10 object-cover rounded-lg" />
      ) : <div className="w-16 h-10 bg-gray-100 rounded-lg" />;
    }},
    { key: 'title', label: 'Title', render: (v: Video) => <span className="font-semibold text-sm">{v.title}</span> },
    { key: 'category', label: 'Category', render: (v: Video) => <span className="text-xs text-gray-500">{v.category || '—'}</span> },
    { key: 'isActive', label: 'Status', render: (v: Video) => (
      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${v.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {v.isActive ? 'Active' : 'Inactive'}
      </span>
    )},
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]">Videos</h1>
        <p className="text-gray-500 text-sm">Manage video gallery</p>
      </div>
      <AdminTable title="Videos" data={videos} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Video" />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Video' : 'Add Video'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Title *</label>
            <input {...register('title', { required: true })} placeholder="Video title"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">YouTube URL *</label>
            <input {...register('url', { required: true })} placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Category</label>
            <select {...register('category')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
              <option value="">Select category</option>
              {['Product Review', 'How To', 'Event', 'Testimonial', 'Brand'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Description</label>
            <textarea {...register('description')} rows={2} placeholder="Video description"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('isActive')} defaultChecked className="w-4 h-4 accent-[#5FAF00]" /> Active
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3">
              {saving ? 'Saving...' : editing ? 'Update Video' : 'Add Video'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
