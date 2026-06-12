import { Suspense } from 'react';

import { getAppConfigActionPublic } from '@/actions/app-config-actions';
import AdminSettingSeoPageContent from '@/components/admin/settings/admin-setting-seo-page-content/admin-setting-seo-page-content';
import AdminSettingSeoPageContentSkeleton from '@/components/admin/settings/admin-setting-seo-page-content/admin-setting-seo-page-content-skeleton';

export default async function SeoPage() {
  const appConfigPromise = getAppConfigActionPublic();

  return (
    <>
      <Suspense fallback={<AdminSettingSeoPageContentSkeleton />}>
        <AdminSettingSeoPageContent appConfigPromise={appConfigPromise} />
      </Suspense>
    </>
  );
}
