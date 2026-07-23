'use client';
import Image from 'next/image';
import Link from 'next/link';
import { FiHeart, FiShare2, FiArrowRight, FiZap } from 'react-icons/fi';
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

  const discountPct = product.discountPrice && product.discountPrice > product.price
    ? Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)
    : null;

  return (
    <div className="card-premium group overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative bg-gradient-to-br from-[#f6fef0] to-[#edf9e0] overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span className={`${getBadgeClass(product.badge)} text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide`}>
              {product.badge}
            </span>
          )}
          {discountPct && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
              -{discountPct}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => dispatch(toggleWishlist(product))}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
            inWishlist
              ? 'bg-red-500 text-white shadow-red-200'
              : 'bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-white'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FiHeart size={13} fill={inWishlist ? 'currentColor' : 'none'} />
        </button>

        <div className="relative h-48 flex items-center justify-center p-4">
          <Image
            src={getProductImage(product, index)}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.07]"
            sizes="(max-width: 768px) 50vw, 25vw"
            loading="lazy"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[#111] text-[15px] mb-2.5 leading-snug group-hover:text-[#5FAF00] transition-colors line-clamp-2">
          {product.name}
        </h3>

        {/* Specs */}
        {(product.specifications?.topSpeed || product.specifications?.range) && (
          <div className="flex items-center gap-3 mb-3">
            {product.specifications?.topSpeed && (
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <div className="w-5 h-5 bg-[#f0f9e8] rounded-md flex items-center justify-center flex-shrink-0">
                  <FaTachometerAlt className="text-[#5FAF00]" size={10} />
                </div>
                <div>
                  <div className="font-bold text-[#111] text-[12px] leading-tight">{product.specifications.topSpeed}</div>
                  <div className="leading-tight">Top Speed</div>
                </div>
              </div>
            )}
            {product.specifications?.range && (
              <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                <div className="w-5 h-5 bg-[#f0f9e8] rounded-md flex items-center justify-center flex-shrink-0">
                  <FaBatteryFull className="text-[#5FAF00]" size={10} />
                </div>
                <div>
                  <div className="font-bold text-[#111] text-[12px] leading-tight">{product.specifications.range}</div>
                  <div className="leading-tight">Range</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-1.5 mt-auto">
          <span className="text-[22px] font-black text-[#5FAF00] leading-none">{formatPrice(product.price)}</span>
          {product.discountPrice && (
            <span className="text-[13px] text-gray-400 line-through font-medium">{formatPrice(product.discountPrice)}</span>
          )}
        </div>

        {product.emiStartsFrom && (
          <p className="text-[11px] text-gray-400 mb-3 flex items-center gap-1">
            <FiZap size={10} className="text-[#5FAF00]" />
            EMI from <span className="font-semibold text-gray-600">₹{product.emiStartsFrom.toLocaleString('en-IN')}/mo</span>
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border-[1.5px] border-gray-200 rounded-xl text-[13px] font-semibold text-[#333] hover:border-[#5FAF00] hover:text-[#5FAF00] hover:bg-[#f0f9e8]/50 transition-all"
          >
            View Details <FiArrowRight size={13} />
          </Link>
          <button
            onClick={handleShare}
            className="w-10 h-10 flex items-center justify-center border-[1.5px] border-gray-200 rounded-xl text-gray-400 hover:border-[#5FAF00] hover:text-[#5FAF00] hover:bg-[#f0f9e8]/50 transition-all flex-shrink-0"
            aria-label="Share product"
          >
            <FiShare2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
