import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/tiptap/styles.css';

import { Inter } from 'next/font/google';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

import './globals.scss';

// app/layout.tsx
import type { Metadata } from 'next';
import { MantineConfigProvider } from '@/libs/mantine/mantine-config-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://thevietnamtravel.com'),
  title: {
    default: 'Smash Travel Vietnam',
    template: '%s | Smash Travel Vietnam',
  },
  description:
    'Discover Vietnam with Smash & Travel Vietnam (STV) - specialized travel, pickleball adventures, and customized packages across 33+ destinations. Book your Vietnam adventure today!',
  applicationName: 'Smash Travel Vietnam',
  openGraph: {
    siteName: 'Smash Travel Vietnam',
    type: 'website',
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://thevietnamtravel.com',
  },
};

const inter = Inter({
  subsets: ['latin-ext'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        <MantineConfigProvider>{children}</MantineConfigProvider>
      </body>
    </html>
  );
}
