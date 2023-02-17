'use client';

import './globals.css';
import { ThemeProvider } from 'next-themes';

import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';

import Navbar from '@/components/Navbar';

import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
});

const activeChainId = ChainId.Polygon;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={poppins.className}>
        <ThemeProvider>
          <ThirdwebProvider activeChain={activeChainId}>
            <Navbar />
            {children}
          </ThirdwebProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
