'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { categoriesApi } from '@/lib/api';
import { Category } from '@/types';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const loadCategories = async () => {
    setLoading(true);
    const { data } = await categoriesApi.getAll();
    setCategories(data.data || []);
    setLoading(false);
  };

  useEffect(() => { loadCategories(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (c: Category) => { setEditing(c); reset({ name: c.name, slug: c.slug, description: c.description }); setModalOpen(true); };

  const onSubmit = async (data: Record<string, unknown>) => {
    if (!data.slug) data.slug = String(data.name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (editing) await categoriesApi.update(editing._id, data);
    else await categoriesApi.create(data);
    setModalOpen(false);
    loadCategories();
  };

  const handleDelete = async (c: Category) => {
    await categoriesApi.delete(c._id);
    loadCategories();
  };

  const columns = [
    { key: 'name', label: 'Name', render: (c: Category) => <span className="font-semibold">{c.name}</span> },
    { key: 'slug', label: 'Slug', render: (c: Category) => <code className="text-xs bg-gray-100 px-2 py-1 rounded">{c.slug}</code> },
    { key: 'description', label: 'Description', render: (c: Category) => <span className="text-gray-500 text-xs">{c.description || '-'}</span> },
    {
      key: 'isActive', label: 'Status',
      render: (c: Category) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${c.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {c.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable title="Categories" data={categories} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Category" total={categories.length} />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Category' : 'Add Category'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Name *</label>
            <input {...register('name', { required: true })} placeholder="e.g. RTO Approved"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Slug</label>
            <input {...register('slug')} placeholder="auto-generated if empty"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Description</label>
            <textarea {...register('description')} rows={3}
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">{editing ? 'Update' : 'Add'} Category</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
