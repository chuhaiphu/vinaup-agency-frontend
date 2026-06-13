import { Suspense } from 'react';

import { getCarouselAdminActionPrivate } from '@/actions/theme-config-actions';
import AdminThemeBannerCarouselPageContent from '@/components/admin/theme/admin-theme-carousel-page-content/admin-theme-carousel-page-content';
import AdminThemeCarouselPageContentSkeleton from '@/components/admin/theme/admin-theme-carousel-page-content/admin-theme-carousel-page-content-skeleton';

export default function AdminThemeBannerCarouselPage() {
  const carouselPromise = getCarouselAdminActionPrivate();

  return (
    <Suspense fallback={<AdminThemeCarouselPageContentSkeleton />}>
      <AdminThemeBannerCarouselPageContent carouselPromise={carouselPromise} />
    </Suspense>
  );
}
