import '@mantine/carousel/styles.css';

import { ScrollToTop } from '@vinaup/ui/shared';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { getAppConfigActionPublic } from '@/actions/app-config-actions';
import LandingHeader from '@/components/landing/layout/landing-header/landing-header';
import { SalonLandingFooter } from '@/components/landing/layout/salon-landing-footer/salon-landing-footer';
import { MaintenanceGuard } from '@/components/landing/primitives/maintenance-guard/maintenance-guard';

import classes from './layout.module.scss';

export async function generateMetadata(): Promise<Metadata> {
  const configResponse = await getAppConfigActionPublic();
  const config = configResponse.data;

  const siteName = config?.siteName || 'Jenahair';
  const websiteTitle = config?.websiteTitle || 'Jenahair';
  const description = config?.websiteDescription || 'Salon tóc cao cấp tại Việt Nam.';

  return {
    title: {
      default: websiteTitle,
      template: `%s`,
    },
    description,
    applicationName: siteName,
    icons: {
      icon: config?.faviconUrl || '/favicon.ico',
    },
    openGraph: {
      url: 'https://jenahair.com',
      type: 'website',
      locale: 'vi_VN',
      siteName,
      title: websiteTitle,
      description,
    },
    alternates: {
      canonical: 'https://jenahair.com',
    },
  };
}

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  // Pull the same admin-configured site name used in generateMetadata so the WebSite
  // JSON-LD `name` and og:site_name always agree (getAppConfigActionPublic is cached, so
  // this does not cause a second network round-trip).
  const configResponse = await getAppConfigActionPublic();
  const siteName = configResponse.data?.siteName || 'Jenahair';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    alternateName: 'Jena Hair',
    url: 'https://jenahair.com/',
  };

  return (
    <main className={classes.landingLayout}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Suspense fallback={null}>
        <MaintenanceGuard />
      </Suspense>
      <LandingHeader />
      {children}
      <SalonLandingFooter />
      <ScrollToTop />
    </main>
  );
}
