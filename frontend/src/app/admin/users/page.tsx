'use client';
import { useState, useEffect } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { usersApi } from '@/lib/api';
import { User } from '@/types';
import { useForm } from 'react-hook-form';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const loadUsers = async () => {
    setLoading(true);
    const { data } = await usersApi.getAll({ page, limit: 10 });
    setUsers(data.data || []);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, [page]);

  const openEdit = (u: User) => {
    setEditing(u);
    reset({ name: u.name, email: u.email, phone: u.phone, role: u.role, isActive: u.isActive });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    if (editing) await usersApi.update(editing._id, data);
    setModalOpen(false);
    loadUsers();
  };

  const handleDelete = async (u: User) => { await usersApi.delete(u._id); loadUsers(); };

  const roleColors: Record<string, string> = {
    admin: 'bg-purple-100 text-purple-700',
    dealer: 'bg-blue-100 text-blue-700',
    customer: 'bg-gray-100 text-gray-700',
  };

  const columns = [
    {
      key: 'name', label: 'User',
      render: (u: User) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#5FAF00] rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {u.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-sm">{u.name}</div>
            <div className="text-xs text-gray-400">{u.email}</div>
          </div>
        </div>
      ),
    },
    { key: 'phone', label: 'Phone', render: (u: User) => <span className="text-sm">{u.phone || '-'}</span> },
    {
      key: 'role', label: 'Role',
      render: (u: User) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg capitalize ${roleColors[u.role]}`}>{u.role}</span>
      ),
    },
    {
      key: 'isActive', label: 'Status',
      render: (u: User) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${u.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {u.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable title="Users" data={users} columns={columns} loading={loading}
        onEdit={openEdit} onDelete={handleDelete} total={total} page={page} onPageChange={setPage} />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Edit User">
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
            <div>
              <label className="text-sm font-semibold mb-1 block">Role</label>
              <select {...register('role')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
                <option value="customer">Customer</option>
                <option value="dealer">Dealer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex items-end pb-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" {...register('isActive')} className="w-4 h-4 accent-[#5FAF00]" /> Active Account
              </label>
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">Update User</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
