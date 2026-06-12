import { Suspense } from 'react';

import { getPageByIdActionPrivate } from '@/actions/page-actions';
import AdminPageDetailPageContent from '@/components/admin/page/admin-page-detail-page-content/admin-page-detail-page-content';

export default function AdminPageDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const currentPagePromise = params.then((params) => getPageByIdActionPrivate(params.id));

  return (
    <Suspense>
      <AdminPageDetailPageContent currentPagePromise={currentPagePromise} />
    </Suspense>
  );
}
