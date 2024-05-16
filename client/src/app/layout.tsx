import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/shared/lib/utils';
import './styles/globals.css';
import Providers from './providers';
import { Header } from '@/widgets/header';
import { Toaster } from '@/shared/ui/toaster';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'E-commerce',
  description: ''
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <Providers>
          <Header />
          <main className="container">{children}</main>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
