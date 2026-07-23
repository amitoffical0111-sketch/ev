import Link from 'next/link';
import { FaBolt } from 'react-icons/fa';
import { FiArrowRight, FiHome } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-[#f0f9e8] rounded-full flex items-center justify-center mx-auto mb-6">
          <FaBolt size={40} className="text-[#5FAF00]" />
        </div>
        <h1 className="text-8xl font-black text-[#5FAF00] mb-4">404</h1>
        <h2 className="text-2xl font-black text-[#111] mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Looks like this page ran out of charge! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn-primary">
            <FiHome size={16} /> Go Home
          </Link>
          <Link href="/products" className="btn-outline">
            Explore Products <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
