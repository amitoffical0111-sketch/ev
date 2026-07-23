'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import api from '@/lib/api';

interface Download {
  _id: string;
  title: string;
  category: string;
  fileSize?: string;
  downloadCount: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminDownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Download | null>(null);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchDownloads = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/downloads');
      setDownloads(data.data || []);
    } catch { setDownloads([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDownloads(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (d: Download) => {
    setEditing(d);
    reset({ title: d.title, category: d.category, fileSize: d.fileSize, isActive: d.isActive });
    setModalOpen(true);
  };

  const onSubmit = async (formData: Record<string, unknown>) => {
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/downloads/${editing._id}`, formData);
      } else {
        const fd = new FormData();
        Object.entries(formData).forEach(([k, v]) => { if (v !== undefined && v !== null) fd.append(k, v as string); });
        const fileInput = (document.getElementById('dl-file') as HTMLInputElement)?.files?.[0];
        if (fileInput) fd.append('file', fileInput);
        await api.post('/downloads', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      setModalOpen(false);
      fetchDownloads();
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (d: Download) => {
    await api.delete(`/downloads/${d._id}`);
    fetchDownloads();
  };

  const columns = [
    { key: 'title', label: 'Title', render: (d: Download) => <span className="font-semibold text-sm">{d.title}</span> },
    { key: 'category', label: 'Category', render: (d: Download) => (
      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">{d.category}</span>
    )},
    { key: 'fileSize', label: 'Size', render: (d: Download) => <span className="text-xs text-gray-500">{d.fileSize || '—'}</span> },
    { key: 'downloadCount', label: 'Downloads', render: (d: Download) => <span className="text-sm font-semibold">{d.downloadCount}</span> },
    { key: 'isActive', label: 'Status', render: (d: Download) => (
      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${d.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {d.isActive ? 'Active' : 'Inactive'}
      </span>
    )},
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]">Downloads</h1>
        <p className="text-gray-500 text-sm">Manage downloadable files (brochures, manuals, etc.)</p>
      </div>
      <AdminTable title="Downloads" data={downloads} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Download" />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Download' : 'Add Download'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Title *</label>
            <input {...register('title', { required: true })} placeholder="e.g. Product Brochure 2024"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Category</label>
              <select {...register('category')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
                {['Brochure', 'Manual', 'Catalogue', 'Certificate', 'General'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">File Size</label>
              <input {...register('fileSize')} placeholder="e.g. 2.4 MB"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Description</label>
            <textarea {...register('description')} rows={2} placeholder="Brief description..."
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          {!editing && (
            <div>
              <label className="text-sm font-semibold mb-1 block">File *</label>
              <input id="dl-file" type="file" accept=".pdf,.doc,.docx,.zip"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          )}
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('isActive')} defaultChecked className="w-4 h-4 accent-[#5FAF00]" /> Active
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3">
              {saving ? 'Saving...' : editing ? 'Update' : 'Add Download'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
