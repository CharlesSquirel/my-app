import { roboto } from '@/lib/fonts/fonts';
import { ClerkProvider } from '@clerk/nextjs';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';

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
    <ClerkProvider>
      <html lang="pl">
        <body
          className={`${GeistSans.className} ${roboto.variable} flex w-screen flex-col justify-center overflow-x-hidden !p-5 antialiased md:!px-[66px] md:!py-7`}
        >
          {/* <header>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header> */}
          <Toaster position="top-center" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
