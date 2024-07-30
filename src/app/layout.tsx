import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Providers } from '@/store/provider';
import Navbar from '@/components/Navbar';
import AppliedDialog from '@/components/AppliedDialog';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wayble Challenge',
  description: 'Job Postings App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AppliedDialog />
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
