import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 w-full flex-col min-h-screen">
      <TopBar />
      <Header />
      <main className="min-w-0 w-full flex-1">{children}</main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
