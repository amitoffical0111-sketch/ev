'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { financeApi } from '@/lib/api';
import { FinancePartner } from '@/types';

export default function AdminFinancePage() {
  const [partners, setPartners] = useState<FinancePartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FinancePartner | null>(null);
  const [saving, setSaving] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const fetchPartners = async () => {
    setLoading(true);
    try {
      const { data } = await financeApi.getAll();
      setPartners(data.data || []);
    } catch { setPartners([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPartners(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (p: FinancePartner) => {
    setEditing(p);
    reset({
      name: p.name, description: p.description, interestRate: p.interestRate,
      tenure: p.tenure, minAmount: p.minAmount, maxAmount: p.maxAmount,
      website: p.website, isActive: p.isActive,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      if (editing) await financeApi.update(editing._id, data);
      else await financeApi.create(data);
      setModalOpen(false);
      fetchPartners();
    } catch { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (p: FinancePartner) => {
    await financeApi.delete(p._id);
    fetchPartners();
  };

  const columns = [
    { key: 'name', label: 'Partner', render: (p: FinancePartner) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#f0f9e8] rounded-xl flex items-center justify-center font-black text-[#5FAF00] text-sm flex-shrink-0">
          {p.name.slice(0, 2).toUpperCase()}
        </div>
        <span className="font-semibold">{p.name}</span>
      </div>
    )},
    { key: 'interestRate', label: 'Interest Rate', render: (p: FinancePartner) => (
      <span className="text-xs bg-[#f0f9e8] text-[#5FAF00] font-bold px-2 py-1 rounded-lg">{p.interestRate || '—'} p.a.</span>
    )},
    { key: 'tenure', label: 'Tenure', render: (p: FinancePartner) => <span className="text-sm text-gray-500">{p.tenure || '—'}</span> },
    { key: 'isActive', label: 'Status', render: (p: FinancePartner) => (
      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {p.isActive ? 'Active' : 'Inactive'}
      </span>
    )},
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]">Finance Partners</h1>
        <p className="text-gray-500 text-sm">Manage EMI and loan partners</p>
      </div>
      <AdminTable title="Finance Partners" data={partners} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Partner" />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Finance Partner' : 'Add Finance Partner'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Partner Name *</label>
            <input {...register('name', { required: true })} placeholder="e.g. HDFC Bank"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Interest Rate</label>
              <input {...register('interestRate')} placeholder="e.g. 9.5%"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Tenure</label>
              <input {...register('tenure')} placeholder="e.g. 12-60 months"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Min Amount (₹)</label>
              <input type="number" {...register('minAmount')} placeholder="20000"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Max Amount (₹)</label>
              <input type="number" {...register('maxAmount')} placeholder="300000"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Description</label>
            <textarea {...register('description')} rows={2} placeholder="Brief description..."
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Website URL</label>
            <input {...register('website')} placeholder="https://..."
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('isActive')} defaultChecked className="w-4 h-4 accent-[#5FAF00]" /> Active
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3">
              {saving ? 'Saving...' : editing ? 'Update Partner' : 'Add Partner'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
