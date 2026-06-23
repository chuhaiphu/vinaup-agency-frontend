import '@mantine/carousel/styles.css';

import { ScrollToTop } from '@vinaup/ui/shared';
import { Metadata } from 'next';
import { Suspense } from 'react';

import { ComputerShopLandingFooter } from '@/components/landing/layout/computer-shop-landing-footer/computer-shop-landing-footer';
import LandingHeader from '@/components/landing/layout/landing-header/landing-header';
import { MaintenanceGuard } from '@/components/landing/primitives/maintenance-guard/maintenance-guard';

import classes from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Vi Tinh Net',
  description:
    'Vi Tính Net - Chuyên cung cấp máy tính bàn, laptop cũ đã qua sử dụng uy tín, chất lượng. Sản phẩm nguyên bản, ngoại hình còn rất mới, giá cực tốt.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Vi Tinh Net',
    description:
      'Vi Tính Net - Chuyên cung cấp máy tính bàn, laptop cũ đã qua sử dụng uy tín, chất lượng. Sản phẩm nguyên bản, ngoại hình còn rất mới, giá cực tốt.',
    url: 'https://vitinhnet.com',
    siteName: 'Vi Tinh Net',
    locale: 'vi_VN',
    type: 'website',
    images: ['/images/group1.png'],
  },
  alternates: {
    canonical: 'https://vitinhnet.com',
  },
};

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={classes.landingLayout}>
      <Suspense fallback={null}>
        <MaintenanceGuard />
      </Suspense>
      <LandingHeader />
      {children}
      <ComputerShopLandingFooter />
      <ScrollToTop />
    </main>
  );
}
