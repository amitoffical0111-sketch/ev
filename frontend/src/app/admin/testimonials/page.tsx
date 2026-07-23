'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { testimonialsApi } from '@/lib/api';
import { Testimonial } from '@/types';
import { FaStar } from 'react-icons/fa';

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const loadItems = async () => {
    setLoading(true);
    const { data } = await testimonialsApi.getAll();
    setItems(data.data || []);
    setLoading(false);
  };

  useEffect(() => { loadItems(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); reset({ name: t.name, location: t.location, rating: t.rating, review: t.review, isFeatured: t.isFeatured }); setModalOpen(true); };

  const onSubmit = async (data: Record<string, unknown>) => {
    data.rating = Number(data.rating);
    if (editing) await testimonialsApi.update(editing._id, data);
    else await testimonialsApi.create(data);
    setModalOpen(false);
    loadItems();
  };

  const handleDelete = async (t: Testimonial) => { await testimonialsApi.delete(t._id); loadItems(); };

  const columns = [
    {
      key: 'name', label: 'Customer',
      render: (t: Testimonial) => (
        <div>
          <div className="font-semibold text-sm">{t.name}</div>
          <div className="text-xs text-gray-400">{t.location}</div>
        </div>
      ),
    },
    {
      key: 'rating', label: 'Rating',
      render: (t: Testimonial) => (
        <div className="flex">
          {[...Array(5)].map((_, i) => <FaStar key={i} size={12} className={i < t.rating ? 'text-yellow-400' : 'text-gray-200'} />)}
        </div>
      ),
    },
    { key: 'review', label: 'Review', render: (t: Testimonial) => <span className="text-xs text-gray-500 line-clamp-2">{t.review}</span> },
    {
      key: 'isFeatured', label: 'Featured',
      render: (t: Testimonial) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${t.isFeatured ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
          {t.isFeatured ? 'Yes' : 'No'}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable title="Testimonials" data={items} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Testimonial" total={items.length} />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Customer Name *</label>
              <input {...register('name', { required: true })} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Location</label>
              <input {...register('location')} placeholder="e.g. Delhi" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Rating *</label>
            <select {...register('rating', { required: true })} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
              {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Review *</label>
            <textarea {...register('review', { required: true })} rows={4} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('isFeatured')} className="w-4 h-4 accent-[#5FAF00]" /> Featured on Homepage
          </label>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">{editing ? 'Update' : 'Add'}</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
