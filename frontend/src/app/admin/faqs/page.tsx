'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { faqsApi } from '@/lib/api';
import { FAQ } from '@/types';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const { register, handleSubmit, reset } = useForm();

  const loadFaqs = async () => {
    setLoading(true);
    const { data } = await faqsApi.getAll();
    setFaqs(data.data || []);
    setLoading(false);
  };

  useEffect(() => { loadFaqs(); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (f: FAQ) => { setEditing(f); reset({ question: f.question, answer: f.answer, category: f.category, sortOrder: f.sortOrder }); setModalOpen(true); };

  const onSubmit = async (data: Record<string, unknown>) => {
    if (editing) await faqsApi.update(editing._id, data);
    else await faqsApi.create(data);
    setModalOpen(false);
    loadFaqs();
  };

  const handleDelete = async (f: FAQ) => { await faqsApi.delete(f._id); loadFaqs(); };

  const columns = [
    { key: 'question', label: 'Question', render: (f: FAQ) => <span className="font-medium text-sm line-clamp-2">{f.question}</span> },
    { key: 'category', label: 'Category', render: (f: FAQ) => <span className="text-xs bg-gray-100 px-2 py-1 rounded capitalize">{f.category}</span> },
    { key: 'sortOrder', label: 'Order', render: (f: FAQ) => <span className="text-sm">{f.sortOrder}</span> },
    {
      key: 'isActive', label: 'Status',
      render: (f: FAQ) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${f.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {f.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <>
      <AdminTable title="FAQs" data={faqs} columns={columns} loading={loading}
        onAdd={openAdd} onEdit={openEdit} onDelete={handleDelete} addLabel="Add FAQ" total={faqs.length} />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit FAQ' : 'Add FAQ'}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-1 block">Question *</label>
            <input {...register('question', { required: true })} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Answer *</label>
            <textarea {...register('answer', { required: true })} rows={4} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Category</label>
              <select {...register('category')} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
                {['general', 'charging', 'legal', 'warranty', 'finance', 'dealers', 'technical'].map(c => (
                  <option key={c} value={c} className="capitalize">{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Sort Order</label>
              <input type="number" {...register('sortOrder')} defaultValue={0} className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1 justify-center py-3">{editing ? 'Update' : 'Add'} FAQ</button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">Cancel</button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
