import { PartnerProvider } from '@/context/PartnerProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Partner Portal',
  description: 'Partner Portal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PartnerProvider>
          {children}
          <ToastContainer position="bottom-center" autoClose={1000} />
        </PartnerProvider>
      </body>
    </html>
  );
}