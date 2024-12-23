'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import store from '@/lib/store';
import React from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto px-4">
          <Provider store={store}>
            <React.StrictMode>
            {children}
            </React.StrictMode>
          </Provider>
        </main>
      </body>
    </html>
  );
}