import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetailClient from './ProductDetailClient';

const ALLOWED_API_HOST = process.env.NEXT_PUBLIC_API_URL
  ? new URL(process.env.NEXT_PUBLIC_API_URL).origin
  : 'http://localhost:5000';

function safeApiUrl(path: string): string {
  const url = new URL(path, ALLOWED_API_HOST);
  if (url.origin !== ALLOWED_API_HOST) throw new Error('Invalid API URL');
  return url.toString();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const safeSlug = encodeURIComponent(slug);
  try {
    const res = await fetch(safeApiUrl(`/api/products/${safeSlug}`), { next: { revalidate: 300 } });
    if (!res.ok) return { title: 'Product Not Found' };
    const { product } = await res.json();
    return {
      title: product.name,
      description: product.shortDescription || product.description,
      openGraph: { images: product.images?.[0] ? [product.images[0]] : [] },
    };
  } catch { return { title: 'Product' }; }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const safeSlug = encodeURIComponent(slug);
  try {
    const res = await fetch(safeApiUrl(`/api/products/${safeSlug}`), { next: { revalidate: 300 } });
    if (!res.ok) notFound();
    const { product } = await res.json();
    return <ProductDetailClient product={product} />;
  } catch { notFound(); }
}
