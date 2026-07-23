'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { careersApi } from '@/lib/api';

interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Career | null>(null);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const { data } = await careersApi.getAll();
      setCareers(data.data || []);
    } catch { setCareers([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCareers(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (c: Career) => {
    setEditing(c);
    reset({ title: c.title, department: c.department, location: c.location, type: c.type, experience: c.experience, isActive: c.isActive });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      if (editing) await careersApi.update(editing._id, data);
      else await careersApi.create(data);
      setModalOpen(false);
      fetchCareers();
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (c: Career) => {
    await careersApi.delete(c._id);
    fetchCareers();
  };

  const columns = [
    { key: 'title', label: 'Position', render: (c: Career) => <span className="font-semibold">{c.title}</span> },
    { key: 'department', label: 'Department', render: (c: Career) => (
      <span className="text-xs bg-purple-50 text-purple-600 px-2 py-1 rounded-lg">{c.department}</span>
    )},
    { key: 'location', label: 'Location', render: (c: Career) => <span className="text-sm text-gray-500">{c.location}</span> },
    { key: 'type', label: 'Type', render: (c: Career) => <span className="text-xs text-gray-500">{c.type}</span> },
    { key: 'experience', label: 'Experience', render: (c: Career) => <span className="text-xs text-gray-500">{c.experience}</span> },
    { key: 'isActive', label: 'Status', render: (c: Career) => (
      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {c.isActive ? 'Active' : 'Closed'}
      </span>
    )},
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]">Careers</h1>
        <p className="text-gray-500 text-sm">Manage job openings</p>
      </div>
      <AdminTable title="Job Openings" data={careers} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Job Opening" />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Job Opening' : 'Add Job Opening'} size="xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Job Title *</label>
            <input {...register('title', { required: true })} placeholder="e.g. Sales Executive"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Department *</label>
              <select {...register('department', { required: true })} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
                <option value="">Select department</option>
                {['Sales', 'Marketing', 'Service', 'R&D', 'HR', 'Finance', 'Operations', 'IT'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Job Type</label>
              <select {...register('type')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
                {['Full Time', 'Part Time', 'Contract', 'Internship'].map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Location *</label>
              <input {...register('location', { required: true })} placeholder="e.g. Delhi / Mumbai"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Experience</label>
              <input {...register('experience')} placeholder="e.g. 2-4 years"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Description</label>
            <textarea {...register('description')} rows={3} placeholder="Job description..."
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('isActive')} defaultChecked className="w-4 h-4 accent-[#5FAF00]" /> Active (visible on website)
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3">
              {saving ? 'Saving...' : editing ? 'Update Job' : 'Add Job Opening'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
