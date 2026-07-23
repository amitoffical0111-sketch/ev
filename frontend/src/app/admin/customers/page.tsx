'use client';
import { useState, useEffect } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { useForm } from 'react-hook-form';
import { usersApi } from '@/lib/api';

interface Customer {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const { data } = await usersApi.getAll({ role: 'customer', page, limit: 10 });
      setCustomers(data.data || data.users || []);
      setTotal(data.total || 0);
    } catch { setCustomers([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCustomers(); }, [page]);

  const openEdit = (c: Customer) => {
    setEditing(c);
    reset({ name: c.name, email: c.email, phone: c.phone, isActive: c.isActive });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!editing) return;
    try {
      await usersApi.update(editing._id, data);
      setModalOpen(false);
      fetchCustomers();
    } catch { alert('Failed to update customer'); }
  };

  const handleDelete = async (c: Customer) => {
    await usersApi.delete(c._id);
    fetchCustomers();
  };

  const columns = [
    { key: 'name', label: 'Name', render: (c: Customer) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#5FAF00] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {c.name?.charAt(0)}
        </div>
        <div>
          <div className="font-semibold text-sm">{c.name}</div>
          <div className="text-xs text-gray-400">{c.email}</div>
        </div>
      </div>
    )},
    { key: 'phone', label: 'Phone', render: (c: Customer) => <span className="text-sm">{c.phone || '—'}</span> },
    { key: 'isActive', label: 'Status', render: (c: Customer) => (
      <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        {c.isActive ? 'Active' : 'Inactive'}
      </span>
    )},
    { key: 'createdAt', label: 'Joined', render: (c: Customer) => <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString('en-IN')}</span> },
  ];

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-[#111]">Customers</h1>
        <p className="text-gray-500 text-sm">Manage registered customers</p>
      </div>
      <AdminTable title="Customers" data={customers} columns={columns} loading={loading}
        onEdit={openEdit} onDelete={handleDelete} total={total} page={page} onPageChange={setPage} />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Edit Customer">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Name</label>
              <input {...register('name')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Phone</label>
              <input {...register('phone')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Email</label>
            <input type="email" {...register('email')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('isActive')} className="w-4 h-4 accent-[#5FAF00]" /> Active
          </label>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">Update Customer</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
