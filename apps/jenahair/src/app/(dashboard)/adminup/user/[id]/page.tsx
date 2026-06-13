import { Suspense } from 'react';

import { getUserByIdActionPrivate } from '@/actions/user-actions';
import AdminUserDetailPageContent from '@/components/admin/user/admin-user-detail-page-content/admin-user-detail-page-content';
import AdminUserDetailPageContentSkeleton from '@/components/admin/user/admin-user-detail-page-content/admin-user-detail-page-content-skeleton';

export default function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const currentUserPromise = params.then((params) => getUserByIdActionPrivate(params.id));

  return (
    <Suspense fallback={<AdminUserDetailPageContentSkeleton />}>
      <AdminUserDetailPageContent currentUserPromise={currentUserPromise} />
    </Suspense>
  );
}
