import { Suspense } from 'react';

import { getMarqueeAdminActionPrivate } from '@/actions/theme-config-actions';
import AdminThemeMarqueePageContent from '@/components/admin/theme/admin-theme-marquee-page-content/admin-theme-marquee-page-content';

export default function AdminThemeMarqueePage() {
  const marqueePromise = getMarqueeAdminActionPrivate();

  return (
    <Suspense>
      <AdminThemeMarqueePageContent marqueePromise={marqueePromise} />
    </Suspense>
  );
}
