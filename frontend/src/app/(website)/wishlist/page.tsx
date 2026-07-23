'use client';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { RootState } from '@/store';
import { toggleWishlist } from '@/store/slices/wishlistSlice';
import { addToCart } from '@/store/slices/cartSlice';
import { formatPrice, getImageUrl } from '@/lib/utils';

export default function WishlistPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.wishlist.items);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-black text-[#111] flex items-center gap-3">
            <FiHeart className="text-red-500" /> My Wishlist
            <span className="text-lg font-normal text-gray-400">({items.length} items)</span>
          </h1>
        </div>
      </div>
      <div className="container-custom py-10">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <FiHeart size={64} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-400 mb-6">Save your favorite electric scooters here</p>
            <Link href="/products" className="btn-primary">Explore Products <FiArrowRight /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence>
              {items.map((product, i) => (
                <motion.div key={product._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="card-premium overflow-hidden group">
                  <div className="relative bg-gradient-to-br from-[#f8fff0] to-[#f0f9e8] p-4">
                    <button onClick={() => dispatch(toggleWishlist(product))}
                      className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10">
                      <FiTrash2 size={14} />
                    </button>
                    <div className="relative h-40">
                      <Image src={getImageUrl(product.images?.[0])} alt={product.name} fill className="object-contain group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#111] mb-2">{product.name}</h3>
                    <p className="text-xl font-black text-[#5FAF00] mb-4">{formatPrice(product.price)}</p>
                    <div className="flex gap-2">
                      <button onClick={() => dispatch(addToCart({ product }))}
                        className="flex-1 flex items-center justify-center gap-1 py-2.5 bg-[#5FAF00] text-white rounded-xl text-sm font-bold hover:bg-[#1F7A00] transition-colors">
                        <FiShoppingCart size={14} /> Add to Cart
                      </button>
                      <Link href={`/products/${product.slug}`}
                        className="flex-1 flex items-center justify-center gap-1 py-2.5 border-2 border-[#EAEAEA] rounded-xl text-sm font-semibold hover:border-[#5FAF00] transition-colors">
                        View <FiArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
