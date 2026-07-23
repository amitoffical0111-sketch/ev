import dynamic from 'next/dynamic';
import HeroSlider from '@/components/home/HeroSlider';
import FeaturesSection from '@/components/home/FeaturesSection';
import ProductsSection from '@/components/home/ProductsSection';
import StatsSection from '@/components/home/StatsSection';
import { Product, Category, HeroSlider as HeroSliderType, Testimonial, FinancePartner, Blog, FAQ } from '@/types';

// Lazy load below-the-fold sections
const BatterySection = dynamic(() => import('@/components/home/BatterySection'));
const FinanceSection = dynamic(() => import('@/components/home/FinanceSection'));
const DealerLocatorSection = dynamic(() => import('@/components/home/DealerLocatorSection'));
const BlogSection = dynamic(() => import('@/components/home/BlogSection'));
const GallerySection = dynamic(() => import('@/components/home/GallerySection'));
const TestimonialsSection = dynamic(() => import('@/components/home/TestimonialsSection'));
const FAQSection = dynamic(() => import('@/components/home/FAQSection'));
const InfoCards = dynamic(() => import('@/components/home/InfoCards'));
const NewsletterSection = dynamic(() => import('@/components/home/NewsletterSection'));

const ALLOWED_API_HOST = process.env.NEXT_PUBLIC_API_URL
  ? new URL(process.env.NEXT_PUBLIC_API_URL).origin
  : 'http://localhost:5000';
const API = `${ALLOWED_API_HOST}/api`;

function safeApiUrl(path: string): string {
  const url = new URL(path, ALLOWED_API_HOST);
  if (url.origin !== ALLOWED_API_HOST) throw new Error('Invalid API URL');
  return url.toString();
}

async function getData() {
  const empty = { products: [], categories: [], heroSliders: [], testimonials: [], financePartners: [], blogs: [], faqs: [] };
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const results = await Promise.allSettled([
      fetch(safeApiUrl('/api/products/featured'), { next: { revalidate: 300 }, signal: controller.signal }),
      fetch(safeApiUrl('/api/categories'), { next: { revalidate: 600 }, signal: controller.signal }),
      fetch(safeApiUrl('/api/hero-sliders'), { next: { revalidate: 600 }, signal: controller.signal }),
      fetch(safeApiUrl('/api/testimonials?isFeatured=true&limit=6'), { next: { revalidate: 600 }, signal: controller.signal }),
      fetch(safeApiUrl('/api/finance-partners?limit=8'), { next: { revalidate: 600 }, signal: controller.signal }),
      fetch(safeApiUrl('/api/blogs?isPublished=true&limit=3'), { next: { revalidate: 300 }, signal: controller.signal }),
      fetch(safeApiUrl('/api/faqs?limit=6'), { next: { revalidate: 600 }, signal: controller.signal }),
    ]);

    clearTimeout(timeout);

    const safe = async (r: PromiseSettledResult<Response>, key: string) => {
      if (r.status === 'fulfilled' && r.value.ok) {
        try {
          const json = await r.value.json();
          return json[key] || json.data || [];
        } catch { return []; }
      }
      return [];
    };

    const [products, categories, heroSliders, testimonials, financePartners, blogs, faqs] = await Promise.all([
      safe(results[0], 'products'),
      safe(results[1], 'data'),
      safe(results[2], 'data'),
      safe(results[3], 'data'),
      safe(results[4], 'data'),
      safe(results[5], 'blogs'),
      safe(results[6], 'data'),
    ]);

    return { products, categories, heroSliders, testimonials, financePartners, blogs, faqs };
  } catch {
    return empty;
  }
}

export default async function HomePage() {
  const { products, categories, heroSliders, testimonials, financePartners, blogs, faqs } = await getData();

  return (
    <>
      <HeroSlider slides={heroSliders} />
      <FeaturesSection />
      <ProductsSection products={products} categories={categories} />
      <StatsSection />
      <BatterySection />
      <FinanceSection partners={financePartners} />
      <DealerLocatorSection />
      <BlogSection blogs={blogs} />
      <GallerySection />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection faqs={faqs} />
      <InfoCards />
      <NewsletterSection />
    </>
  );
}
