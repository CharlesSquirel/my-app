import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Chillair Protocols',
  description: 'Protocols system for Chillair',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${GeistSans.className} flex w-screen flex-col justify-center overflow-x-hidden !px-[66px] !py-7 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
