'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShare2, FiArrowRight } from 'react-icons/fi';
import { FaTachometerAlt, FaBatteryFull } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist, isInWishlist } from '@/store/slices/wishlistSlice';
import { RootState } from '@/store';
import { Product } from '@/types';
import { formatPrice, getBadgeClass, getImageUrl } from '@/lib/utils';

const FALLBACK_IMAGES = ['/bikep1.png', '/bikep2.png', '/bikep3.png', '/bikep4.png'];

function getProductImage(product: Product, index: number): string {
  const img = product.images?.[0];
  const isValid = img && img.trim() !== '' && !img.includes('undefined') && !img.includes('null');
  if (isValid) {
    const resolved = getImageUrl(img);
    // If resolved URL points to backend and backend may be down, still use fallback for local dev
    if (resolved.startsWith('http://localhost:5000')) {
      return FALLBACK_IMAGES[(product.name?.charCodeAt(0) || index) % 4];
    }
    return resolved;
  }
  return FALLBACK_IMAGES[(product.name?.charCodeAt(0) || index) % 4];
}

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const dispatch = useDispatch();
  const inWishlist = useSelector((state: RootState) => isInWishlist(state, product._id));

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: `/products/${product.slug}` });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/products/${product.slug}`);
    }
  };

  return (
    <div className="card-premium group overflow-hidden">
      {/* Image */}
      <div className="relative bg-gradient-to-br from-[#f8fff0] to-[#f0f9e8] p-4 overflow-hidden">
        {product.badge && (
          <span className={`absolute top-3 left-3 z-10 ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${inWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-400 hover:text-red-500'}`}>
          <FiHeart size={14} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        <div className="relative h-44 flex items-center justify-center">
          <Image
            src={getProductImage(product, index)}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-[#111] text-base mb-2 group-hover:text-[#5FAF00] transition-colors">{product.name}</h3>

        <div className="flex items-center gap-4 mb-3">
          {product.specifications?.topSpeed && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaTachometerAlt className="text-[#5FAF00]" size={12} />
              <div>
                <div className="font-semibold text-[#111]">{product.specifications.topSpeed}</div>
                <div>Top Speed</div>
              </div>
            </div>
          )}
          {product.specifications?.range && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FaBatteryFull className="text-[#5FAF00]" size={12} />
              <div>
                <div className="font-semibold text-[#111]">{product.specifications.range}</div>
                <div>Range</div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-black text-[#5FAF00]">{formatPrice(product.price)}</span>
          {product.discountPrice && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.discountPrice)}</span>
          )}
        </div>

        {product.emiStartsFrom && (
          <p className="text-xs text-gray-500 mb-3">EMI from ₹{product.emiStartsFrom.toLocaleString('en-IN')}/month</p>
        )}

        <div className="flex gap-2">
          <Link href={`/products/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-1 py-2.5 border-2 border-[#EAEAEA] rounded-xl text-sm font-semibold hover:border-[#5FAF00] hover:text-[#5FAF00] transition-all">
            View Details <FiArrowRight size={14} />
          </Link>
          <button onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center border-2 border-[#EAEAEA] rounded-xl hover:border-[#5FAF00] hover:text-[#5FAF00] transition-all">
            <FiShare2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
