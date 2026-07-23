'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiUpload, FiTrash2, FiPlus } from 'react-icons/fi';
import { galleryApi } from '@/lib/api';
import { getImageUrl } from '@/lib/utils';

interface GalleryItem { _id: string; image: string; title?: string; category?: string; }

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadItems = async () => {
    setLoading(true);
    const { data } = await galleryApi.getAll();
    setItems(data.data || []);
    setLoading(false);
  };

  useEffect(() => { loadItems(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('category', 'general');
        await galleryApi.upload(formData);
      }
      loadItems();
    } finally { setUploading(false); if (fileRef.current) fileRef.current.value = ''; }
  };

  const handleDelete = async (id: string) => {
    if (deleteId === id) {
      await galleryApi.delete(id);
      setDeleteId(null);
      loadItems();
    } else {
      setDeleteId(id);
      setTimeout(() => setDeleteId(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#111]">Gallery</h1>
          <p className="text-gray-500 text-sm">{items.length} images</p>
        </div>
        <div>
          <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
          <button onClick={() => fileRef.current?.click()} disabled={uploading} className="btn-primary">
            <FiUpload size={16} /> {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => <div key={i} className="aspect-square bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Upload tile */}
          <button onClick={() => fileRef.current?.click()}
            className="aspect-square border-2 border-dashed border-[#EAEAEA] rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-[#5FAF00] hover:bg-[#f8fff0] transition-all group">
            <FiPlus size={24} className="text-gray-300 group-hover:text-[#5FAF00]" />
            <span className="text-xs text-gray-400 group-hover:text-[#5FAF00]">Add More</span>
          </button>

          {items.map((item, i) => (
            <motion.div key={item._id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="relative aspect-square rounded-2xl overflow-hidden group bg-gray-100">
              <Image src={getImageUrl(item.image)} alt={item.title || 'Gallery'} fill className="object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button onClick={() => handleDelete(item._id)}
                  className={`opacity-0 group-hover:opacity-100 p-2 rounded-xl transition-all ${deleteId === item._id ? 'bg-red-500 text-white' : 'bg-white text-red-500'}`}
                  title={deleteId === item._id ? 'Click again to confirm' : 'Delete'}>
                  <FiTrash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border-2 border-dashed border-[#EAEAEA] rounded-3xl">
          <FiUpload size={48} className="mx-auto text-gray-200 mb-4" />
          <p className="text-gray-400 mb-4">No images yet. Upload your first image!</p>
          <button onClick={() => fileRef.current?.click()} className="btn-primary">Upload Images</button>
        </div>
      )}
    </div>
  );
}
