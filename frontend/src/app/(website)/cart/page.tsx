'use client';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowRight, FiTag } from 'react-icons/fi';
import { RootState } from '@/store';
import { removeFromCart, updateQuantity, clearCart, selectCartTotal } from '@/store/slices/cartSlice';
import { formatPrice, getImageUrl } from '@/lib/utils';

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = useSelector(selectCartTotal);

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-black text-[#111] flex items-center gap-3">
            <FiShoppingCart className="text-[#5FAF00]" /> My Cart
            <span className="text-lg font-normal text-gray-400">({items.length} items)</span>
          </h1>
        </div>
      </div>

      <div className="container-custom py-10">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <FiShoppingCart size={64} className="text-gray-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-400 mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-6">Add electric scooters to your cart</p>
            <Link href="/products" className="btn-primary">Explore Products <FiArrowRight /></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <motion.div key={item.product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-[#EAEAEA] rounded-2xl p-4 flex gap-4">
                  <div className="relative w-24 h-24 bg-[#f8fff0] rounded-xl flex-shrink-0">
                    <Image src={getImageUrl(item.product.images?.[0])} alt={item.product.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#111] mb-1 truncate">{item.product.name}</h3>
                    {item.color && <p className="text-xs text-gray-400 mb-2">Color: {item.color}</p>}
                    <p className="text-lg font-black text-[#5FAF00]">{formatPrice(item.product.price)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => dispatch(removeFromCart(item.product._id))}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <FiTrash2 size={16} />
                    </button>
                    <div className="flex items-center gap-2 border border-[#EAEAEA] rounded-xl overflow-hidden">
                      <button onClick={() => dispatch(updateQuantity({ id: item.product._id, quantity: Math.max(1, item.quantity - 1) }))}
                        className="p-2 hover:bg-gray-50 transition-colors">
                        <FiMinus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item.product._id, quantity: item.quantity + 1 }))}
                        className="p-2 hover:bg-gray-50 transition-colors">
                        <FiPlus size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
              <button onClick={() => dispatch(clearCart())}
                className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1">
                <FiTrash2 size={14} /> Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#f8fff0] rounded-3xl p-6 border border-[#EAEAEA] sticky top-24">
                <h2 className="font-black text-xl text-[#111] mb-5">Order Summary</h2>
                <div className="space-y-3 mb-5">
                  {items.map(item => (
                    <div key={item.product._id} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate flex-1 mr-2">{item.product.name} × {item.quantity}</span>
                      <span className="font-semibold">{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#EAEAEA] pt-4 mb-5">
                  <div className="flex justify-between font-black text-lg">
                    <span>Total</span>
                    <span className="text-[#5FAF00]">{formatPrice(total)}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">*Ex-showroom price. Road tax & insurance extra.</p>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input type="text" placeholder="Coupon code"
                      className="flex-1 px-3 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
                    <button className="px-4 py-2.5 bg-[#111] text-white rounded-xl text-sm font-bold hover:bg-[#333] transition-colors">
                      <FiTag size={14} />
                    </button>
                  </div>
                  <Link href="/book-test-ride" className="btn-primary w-full justify-center py-3.5">
                    Proceed to Book <FiArrowRight />
                  </Link>
                  <Link href="/products" className="btn-outline w-full justify-center py-3">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
