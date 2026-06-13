import { Suspense } from 'react';

import { getMarqueeAdminActionPrivate } from '@/actions/theme-config-actions';
import AdminThemeMarqueePageContent from '@/components/admin/theme/admin-theme-marquee-page-content/admin-theme-marquee-page-content';
import AdminThemeMarqueePageContentSkeleton from '@/components/admin/theme/admin-theme-marquee-page-content/admin-theme-marquee-page-content-skeleton';

export default function AdminThemeMarqueePage() {
  const marqueePromise = getMarqueeAdminActionPrivate();

  return (
    <Suspense fallback={<AdminThemeMarqueePageContentSkeleton />}>
      <AdminThemeMarqueePageContent marqueePromise={marqueePromise} />
    </Suspense>
  );
}
