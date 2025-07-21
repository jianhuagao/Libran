import type { Metadata } from 'next';
import '@/styles/globals.css';
import Header from '@/components/partials/Header/page';
import Footer from '@/components/partials/Footer/page';

export const metadata: Metadata = {
  title: 'Libran',
  description: 'Harmonious templates for modern brands'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
