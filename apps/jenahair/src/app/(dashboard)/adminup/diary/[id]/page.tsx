import { Suspense } from 'react';

import { getDiaryByIdActionPrivate } from '@/actions/diary-actions';
import { getAllDiaryCategoriesActionPrivate } from '@/actions/diary-category-actions';
import AdminDiaryDetailPageContent from '@/components/admin/diary/admin-diary-detail-page-content/admin-diary-detail-page-content';

export default function AdminDiaryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const currentDiaryPromise = params.then((params) => getDiaryByIdActionPrivate(params.id));
  const diaryCategoriesPromise = getAllDiaryCategoriesActionPrivate();

  return (
    <Suspense>
      <AdminDiaryDetailPageContent
        currentDiaryPromise={currentDiaryPromise}
        diaryCategoriesPromise={diaryCategoriesPromise}
      />
    </Suspense>
  );
}
