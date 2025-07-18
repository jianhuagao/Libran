import type { Metadata } from 'next';
import { geist } from '@/app/fonts';
import '@/styles/globals.css';
import { ThemeProvider } from '@/context/themeContext';

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
    <html lang="en">
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
