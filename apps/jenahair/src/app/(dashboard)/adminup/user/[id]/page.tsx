import { Suspense } from 'react';

import AdminUserDetailPageContent from '@/components/admin/user/admin-user-detail-page-content/admin-user-detail-page-content';

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense>
      <AdminUserDetailPageContent params={params} />
    </Suspense>
  );
}
