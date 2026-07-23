'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { FiCopy, FiEye } from 'react-icons/fi';
import Link from 'next/link';
import AdminTable from '@/components/admin/AdminTable';
import AdminModal from '@/components/admin/AdminModal';
import { productsApi, categoriesApi } from '@/lib/api';
import { Product, Category } from '@/types';
import { formatPrice, getImageUrl } from '@/lib/utils';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [saving, setSaving] = useState(false);

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await productsApi.getAll({ page: String(page), limit: '10' });
      setProducts(data.products || []);
      setTotal(data.total || 0);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchProducts(); }, [page]);
  useEffect(() => { categoriesApi.getAll().then(({ data }) => setCategories(data.data || [])); }, []);

  const openAdd = () => { setEditing(null); reset({}); setModalOpen(true); };
  const openEdit = (p: Product) => {
    setEditing(p);
    reset({
      name: p.name, price: p.price, discountPrice: p.discountPrice,
      badge: p.badge, tagline: p.tagline, shortDescription: p.shortDescription,
      description: p.description, category: (p.category as Category)?._id,
      isFeatured: p.isFeatured, isBestSeller: p.isBestSeller, isNewArrival: p.isNewArrival,
      'specifications.topSpeed': p.specifications?.topSpeed,
      'specifications.range': p.specifications?.range,
      'specifications.battery': p.specifications?.battery,
      'specifications.batteryCapacity': p.specifications?.batteryCapacity,
      'specifications.chargingTime': p.specifications?.chargingTime,
      'specifications.motor': p.specifications?.motor,
      'specifications.motorPower': p.specifications?.motorPower,
      'specifications.warranty': p.specifications?.warranty,
      'specifications.brakes': p.specifications?.brakes,
      emiStartsFrom: p.emiStartsFrom,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data: Record<string, unknown>) => {
    setSaving(true);
    try {
      const formData = new FormData();
      const files = (data.images as FileList);
      if (files?.length) {
        Array.from(files).forEach(f => formData.append('images', f));
      }
      delete data.images;

      // Flatten specifications into nested object
      const specs: Record<string, unknown> = {};
      Object.keys(data).forEach(key => {
        if (key.startsWith('specifications.')) {
          specs[key.replace('specifications.', '')] = data[key];
          delete data[key];
        }
      });
      if (Object.keys(specs).length) data.specifications = specs;

      // Send all fields as individual form fields
      const sendFlat = (obj: Record<string, unknown>, prefix = '') => {
        Object.entries(obj).forEach(([k, v]) => {
          const key = prefix ? `${prefix}[${k}]` : k;
          if (v !== null && v !== undefined && v !== '') {
            if (typeof v === 'object' && !Array.isArray(v)) {
              sendFlat(v as Record<string, unknown>, key);
            } else {
              formData.append(key, String(v));
            }
          }
        });
      };
      sendFlat(data);

      if (editing) {
        await productsApi.update(editing._id, formData);
      } else {
        await productsApi.create(formData);
      }
      setModalOpen(false);
      fetchProducts();
    } catch (err) {
      alert('Failed to save product');
    } finally { setSaving(false); }
  };

  const handleDelete = async (p: Product) => {
    await productsApi.delete(p._id);
    fetchProducts();
  };

  const handleDuplicate = async (p: Product) => {
    await productsApi.duplicate(p._id);
    fetchProducts();
  };

  const columns = [
    {
      key: 'image', label: 'Image',
      render: (p: Product) => (
        <div className="w-12 h-12 bg-[#f8fff0] rounded-xl overflow-hidden relative">
          <Image src={getImageUrl(p.images?.[0])} alt={p.name} fill className="object-contain p-1" />
        </div>
      ),
    },
    {
      key: 'name', label: 'Product',
      render: (p: Product) => (
        <div>
          <div className="font-semibold text-[#111]">{p.name}</div>
          <div className="text-xs text-gray-400">{p.sku}</div>
        </div>
      ),
    },
    {
      key: 'badge', label: 'Badge',
      render: (p: Product) => p.badge ? (
        <span className={`text-xs font-bold px-2 py-1 rounded-lg ${p.badge === 'RTO Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {p.badge}
        </span>
      ) : null,
    },
    { key: 'price', label: 'Price', render: (p: Product) => <span className="font-bold text-[#5FAF00]">{formatPrice(p.price)}</span> },
    {
      key: 'isActive', label: 'Status',
      render: (p: Product) => (
        <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${p.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {p.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const badgeOptions = ['', 'RTO Approved', 'Non-RTO', 'New', 'Best Seller', 'Limited'];

  return (
    <>
      <AdminTable
        title="Products"
        data={products}
        columns={columns}
        loading={loading}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        addLabel="Add Product"
        total={total}
        page={page}
        onPageChange={setPage}
        extraActions={(p) => (
          <>
            <Link href={`/products/${p.slug}`} target="_blank"
              className="p-1.5 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors">
              <FiEye size={14} />
            </Link>
            <button onClick={() => handleDuplicate(p)}
              className="p-1.5 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
              <FiCopy size={14} />
            </button>
          </>
        )}
      />

      <AdminModal isOpen={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Product' : 'Add Product'} size="xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-semibold mb-1 block">Product Name *</label>
              <input {...register('name', { required: true })} placeholder="e.g. Real Legend DLX+"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Category *</label>
              <select {...register('category', { required: true })}
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
                <option value="">Select category</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Badge</label>
              <select {...register('badge')}
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] bg-white">
                {badgeOptions.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Price (₹) *</label>
              <input type="number" {...register('price', { required: true })} placeholder="91499"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Discount Price (₹)</label>
              <input type="number" {...register('discountPrice')} placeholder="Optional"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">EMI Starts From (₹/mo)</label>
              <input type="number" {...register('emiStartsFrom')}
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Tagline</label>
              <input {...register('tagline')} placeholder="e.g. The Legend Redefined"
                className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">Short Description</label>
            <textarea {...register('shortDescription')} rows={2}
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Full Description</label>
            <textarea {...register('description')} rows={3}
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
          </div>

          <div className="border-t border-[#EAEAEA] pt-4">
            <p className="text-sm font-bold text-[#111] mb-3">Specifications</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { key: 'topSpeed', label: 'Top Speed', placeholder: '70 km/h' },
                { key: 'range', label: 'Range', placeholder: '120+ km' },
                { key: 'battery', label: 'Battery Type', placeholder: 'Lithium-Ion' },
                { key: 'batteryCapacity', label: 'Battery Capacity', placeholder: '72V 30Ah' },
                { key: 'chargingTime', label: 'Charging Time', placeholder: '6-8 Hours' },
                { key: 'motor', label: 'Motor Type', placeholder: 'BLDC Hub Motor' },
                { key: 'motorPower', label: 'Motor Power', placeholder: '2000W' },
                { key: 'warranty', label: 'Warranty', placeholder: '5 Years' },
                { key: 'brakes', label: 'Brakes', placeholder: 'Disc Brake' },
              ].map(spec => (
                <div key={spec.key}>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">{spec.label}</label>
                  <input {...register(`specifications.${spec.key}`)} placeholder={spec.placeholder}
                    className="w-full px-3 py-2 border border-[#EAEAEA] rounded-lg text-xs focus:outline-none focus:border-[#5FAF00]" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-1 block">Product Images</label>
            <input type="file" {...register('images')} multiple accept="image/*"
              className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
          </div>

          <div className="flex items-center gap-4">
            {[
              { key: 'isFeatured', label: 'Featured' },
              { key: 'isBestSeller', label: 'Best Seller' },
              { key: 'isNewArrival', label: 'New Arrival' },
            ].map(flag => (
              <label key={flag.key} className="flex items-center gap-2 text-sm cursor-pointer">
                <input type="checkbox" {...register(flag.key)} className="w-4 h-4 accent-[#5FAF00]" />
                {flag.label}
              </label>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary flex-1 justify-center py-3">
              {saving ? 'Saving...' : editing ? 'Update Product' : 'Add Product'}
            </button>
            <button type="button" onClick={() => setModalOpen(false)} className="btn-outline flex-1 justify-center py-3">
              Cancel
            </button>
          </div>
        </form>
      </AdminModal>
    </>
  );
}
