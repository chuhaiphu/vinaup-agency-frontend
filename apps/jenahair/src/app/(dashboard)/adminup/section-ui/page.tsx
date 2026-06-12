import { Suspense } from 'react';

import {
  getAllSectionUIsActionPublic,
  getUsedSectionUIPositionsActionPublic,
} from '@/actions/section-ui-actions';
import AdminSectionUIDetailPageContent from '@/components/admin/section-ui/admin-section-ui-detail-page-content/admin-section-ui-detail-page-content';
import SectionUIDetailSkeleton from '@/components/admin/section-ui/admin-section-ui-detail-page-content/section-ui-detail-skeleton';

export default async function AdminSectionUIPage() {
  const existingDynamicSectionUIsPromise = getAllSectionUIsActionPublic().then(
    (res) => res.data ?? [],
  );
  const usedPositionsPromise = getUsedSectionUIPositionsActionPublic().then(
    (res) => res.data ?? [],
  );

  return (
    <Suspense fallback={<SectionUIDetailSkeleton />}>
      <AdminSectionUIDetailPageContent
        existingDynamicSectionUIsPromise={existingDynamicSectionUIsPromise}
        usedPositionsPromise={usedPositionsPromise}
      />
    </Suspense>
  );
}
