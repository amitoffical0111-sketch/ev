'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { dealersApi } from '@/lib/api';
import { Dealer } from '@/types';
import { FaCheckCircle } from 'react-icons/fa';

export default function AdminDealersPage() {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Dealer | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const loadDealers = async () => {
    setLoading(true);
    const { data } = await dealersApi.getAll();
    setDealers(data.dealers || []);
    setLoading(false);
  };

  useEffect(() => { loadDealers(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (d: Dealer) => {
    setEditing(d);
    reset({ name: d.name, ownerName: d.ownerName, email: d.email, phone: d.phone, workingHours: d.workingHours, 'address.city': d.address?.city, 'address.state': d.address?.state, 'address.pincode': d.address?.pincode });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    const payload = { ...data, address: { city: data['address.city'], state: data['address.state'], pincode: data['address.pincode'] } };
    if (editing) await dealersApi.update(editing._id, payload);
    else await dealersApi.create(payload);
    setModalOpen(false);
    loadDealers();
  };

  const handleDelete = async (d: Dealer) => { await dealersApi.delete(d._id); loadDealers(); };

  const columns = [
    {
      key: 'name', label: 'Dealer',
      render: (d: Dealer) => (
        <div>
          <div className="font-semibold flex items-center gap-1">
            {d.name}
            {d.isVerified && <FaCheckCircle size={12} className="text-[#5FAF00]" />}
          </div>
          <div className="text-xs text-gray-400">{d.ownerName}</div>
        </div>
      ),
    },
    { key: 'phone', label: 'Phone', render: (d: Dealer) => <a href={`tel:${d.phone}`} className="text-sm hover:text-[#5FAF00]">{d.phone}</a> },
    { key: 'city', label: 'Location', render: (d: Dealer) => <span className="text-sm">{[d.address?.city, d.address?.state].filter(Boolean).join(', ')}</span> },
    {
      key: 'status', label: 'Status',
      render: (d: Dealer) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize ${d.status === 'approved' ? 'bg-green-100 text-green-700' : d.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
          {d.status}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable title="Dealers" data={dealers} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Dealer" total={dealers.length} />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Dealer' : 'Add Dealer'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Dealer Name *</label>
              <input {...register('name', { required: true })} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Owner Name *</label>
              <input {...register('ownerName', { required: true })} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Email *</label>
              <input type="email" {...register('email', { required: true })} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Phone *</label>
              <input {...register('phone', { required: true })} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">City</label>
              <input {...register('address.city')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">State</label>
              <input {...register('address.state')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Pincode</label>
              <input {...register('address.pincode')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Working Hours</label>
              <input {...register('workingHours')} placeholder="Mon-Sat: 10AM-7PM" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">{editing ? 'Update' : 'Add'} Dealer</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
