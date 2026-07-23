'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { heroApi } from '@/lib/api';
import { HeroSlider } from '@/types';

export default function AdminHeroSlidersPage() {
  const [sliders, setSliders] = useState<HeroSlider[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<HeroSlider | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const loadSliders = async () => {
    setLoading(true);
    const { data } = await heroApi.getAll();
    setSliders(data.data || []);
    setLoading(false);
  };

  useEffect(() => { loadSliders(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (s: HeroSlider) => {
    setEditing(s);
    reset({ title: s.title, subtitle: s.subtitle, description: s.description, badge: s.badge, ctaText: s.ctaText, ctaLink: s.ctaLink, secondaryCtaText: s.secondaryCtaText, secondaryCtaLink: s.secondaryCtaLink, sortOrder: s.sortOrder, isActive: s.isActive });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    const formData = new FormData();
    const file = (data.image as FileList)?.[0];
    if (file) formData.append('image', file);
    delete data.image;
    Object.entries(data).forEach(([k, v]) => formData.append(k, String(v ?? '')));

    if (editing) await heroApi.update(editing._id, data);
    else await heroApi.create(formData);
    setModalOpen(false);
    loadSliders();
  };

  const handleDelete = async (s: HeroSlider) => { await heroApi.delete(s._id); loadSliders(); };

  const columns = [
    { key: 'title', label: 'Title', render: (s: HeroSlider) => <span className="font-semibold text-sm whitespace-pre-line line-clamp-2">{s.title}</span> },
    { key: 'badge', label: 'Badge', render: (s: HeroSlider) => <span className="text-xs text-gray-500">{s.badge || '-'}</span> },
    { key: 'sortOrder', label: 'Order', render: (s: HeroSlider) => <span className="text-sm">{s.sortOrder}</span> },
    {
      key: 'isActive', label: 'Status',
      render: (s: HeroSlider) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {s.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable title="Hero Sliders" data={sliders} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add Slide" total={sliders.length} />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Slide' : 'Add Slide'} size="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Title * (use \n for line break)</label>
            <textarea {...register('title', { required: true })} rows={2} placeholder="RIDE REAL.\nRIDE ELECTRIC."
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Subtitle</label>
              <input {...register('subtitle')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Badge</label>
              <input {...register('badge')} placeholder="e.g. New Generation" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">CTA Text</label>
              <input {...register('ctaText')} placeholder="Explore Products" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">CTA Link</label>
              <input {...register('ctaLink')} placeholder="/products" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Secondary CTA Text</label>
              <input {...register('secondaryCtaText')} placeholder="Book Test Ride" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Secondary CTA Link</label>
              <input {...register('secondaryCtaLink')} placeholder="/book-test-ride" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Sort Order</label>
              <input type="number" {...register('sortOrder')} defaultValue={0} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Description</label>
            <textarea {...register('description')} rows={2} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Slide Image</label>
            <input type="file" {...register('image')} accept="image/*" className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm" />
          </div>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" {...register('isActive')} defaultChecked className="w-4 h-4 accent-[#5FAF00]" /> Active
          </label>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">{editing ? 'Update' : 'Add'} Slide</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
