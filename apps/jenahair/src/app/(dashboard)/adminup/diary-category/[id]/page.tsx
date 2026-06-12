import { Suspense } from 'react';

import {
  getAllDiaryCategoriesActionPrivate,
  getAvailableSortOrdersActionPrivate,
  getDiaryCategoryByIdActionPrivate,
} from '@/actions/diary-category-actions';
import AdminDiaryCategoryDetailPageContent from '@/components/admin/diary/admin-diary-category-detail-page-content/admin-diary-category-detail-page-content';

export default function AdminDiaryCategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentDiaryCategoryPromise = params.then((params) =>
    getDiaryCategoryByIdActionPrivate(params.id),
  );
  const diaryCategoriesPromise = getAllDiaryCategoriesActionPrivate();
  const availableSortOrdersPromise = currentDiaryCategoryPromise.then((res) =>
    getAvailableSortOrdersActionPrivate(res.data?.parent?.id || ''),
  );

  return (
    <Suspense>
      <AdminDiaryCategoryDetailPageContent
        currentDiaryCategoryPromise={currentDiaryCategoryPromise}
        diaryCategoriesPromise={diaryCategoriesPromise}
        availableSortOrdersPromise={availableSortOrdersPromise}
      />
    </Suspense>
  );
}
