import { Suspense } from 'react';

import { getThemeConfigAdminActionPrivate } from '@/actions/theme-config-actions';
import AdminThemeSocialLinksPageContent from '@/components/admin/theme/admin-theme-social-links-page-content/admin-theme-social-links-page-content';
import AdminThemeSocialLinksPageContentSkeleton from '@/components/admin/theme/admin-theme-social-links-page-content/admin-theme-social-links-page-content-skeleton';

export default function AdminThemeSocialLinksPage() {
  const themeConfigPromise = getThemeConfigAdminActionPrivate();

  return (
    <Suspense fallback={<AdminThemeSocialLinksPageContentSkeleton />}>
      <AdminThemeSocialLinksPageContent themeConfigPromise={themeConfigPromise} />
    </Suspense>
  );
}
