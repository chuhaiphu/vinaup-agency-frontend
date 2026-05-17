import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

import './globals.scss';

// app/layout.tsx
import type { Metadata } from 'next';
import { MantineConfigProvider } from '@vinaup/ui/libs/mantine';
import { inter } from './font';

export const metadata: Metadata = {
  metadataBase: new URL('https://vitinhnet.com'),
  title: {
    default: 'Vi Tinh Net',
    template: '%s | Vi Tinh Net',
  },
  description:
    'Vi Tinh Net',
  applicationName: 'Vi Tinh Net',
  openGraph: {
    siteName: 'Vi Tinh Net',
    type: 'website',
    locale: 'vi_VN',
    images: ['/images/group1.png'],
  },
  alternates: {
    canonical: 'https://vitinhnet.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" {...mantineHtmlProps} className={inter.variable}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineConfigProvider>{children}</MantineConfigProvider>
      </body>
    </html>
  );
}
