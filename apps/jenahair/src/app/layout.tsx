import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';

import './globals.scss';

// app/layout.tsx
import { MantineConfigProvider } from '@vinaup/ui/libs/mantine';
import type { Metadata } from 'next';

import { inter } from './font';

export const metadata: Metadata = {
  metadataBase: new URL('https://jenahair.com'),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
