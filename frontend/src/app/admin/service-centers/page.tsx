'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import api from '@/lib/api';

interface ServiceCenter {
  _id: string;
  name: string;
  address: { city: string; state: string; street?: string; pincode?: string };
  phone: string;
  workingHours?: string;
  isActive: boolean;
}

export default function AdminServiceCentersPage() {
  const [centers, setCenters] = useState<ServiceCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceCenter | null>(null);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchCenters = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/service-centers');
      setCenters(data.data || []);
    } catch { setCenters([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCenters(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (c: ServiceCenter) => {
    setEditing(c);
    reset({ name: c.name, city: c.address?.city, state: c.address?.state, phone: c.phone, workingHours: c.workingHours, isActive: c.isActive });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      const { city, state, ...rest } = data as Record<string, unknown> & { city: unknown; state: unknown };
      const payload = { ...rest, address: { city, state } };
      if (editing) await api.put(`/service-centers/${editing._id}`, payload);
      else await api.post('/service-centers', payload);
      setModalOpen(false);
      fetchCenters();
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (c: ServiceCenter) => {
    await api.delete(`/service-centers/${c._id}`);
    fetchCenters();
  };

  const columns = [
    { key: 'name', label: 'Name', render: (c: ServiceCenter) => <span className="font-semibold">{c.name}</span> },
    { key: 'city', label: 'City', render: (c: ServiceCenter) => <span>{c.address?.city}, {c.address?.state}</span> },
    { key: 'phone', label: 'Phone' },
    { key: 'workingHours', label: 'Hours', render: (c: ServiceCenter) => <span className="text-xs text-gray-500">{c.workingHours || '—'}</span> },
    { key: 'isActive', label: 'Status', render: (c: ServiceCenter) => (
      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {c.isActive ? 'Active' : 'Inactive'}
      </span>
    )},
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]">Service Centers</h1>
        <p className="text-gray-500 text-sm">Manage service center locations</p>
      </div>
      <AdminTable title="Service Centers" data={centers} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Service Center" />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service Center' : 'Add Service Center'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Name *</label>
            <input {...register('name', { required: true })} placeholder="e.g. Real E Bikes Service - Delhi"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">City *</label>
              <input {...register('city', { required: true })} placeholder="City"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">State *</label>
              <input {...register('state', { required: true })} placeholder="State"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Address</label>
            <input {...register('address')} placeholder="Full address"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Phone *</label>
              <input {...register('phone', { required: true })} placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Working Hours</label>
              <input {...register('workingHours')} placeholder="Mon-Sat: 9AM-7PM"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('isActive')} defaultChecked className="w-4 h-4 accent-[#5FAF00]" /> Active
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3">
              {saving ? 'Saving...' : editing ? 'Update' : 'Add Service Center'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
