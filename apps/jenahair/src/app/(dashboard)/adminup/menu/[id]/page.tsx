import { Suspense } from 'react';

import {
  getAllMenusActionPrivate,
  getAvailableSortOrdersActionPrivate,
  getMenuByIdActionPrivate,
} from '@/actions/menu-actions';
import AdminMenuDetailPageContent from '@/components/admin/menu/admin-menu-detail-page-content/admin-menu-detail-page-content';
import AdminMenuDetailPageContentSkeleton from '@/components/admin/menu/admin-menu-detail-page-content/admin-menu-detail-page-content-skeleton';

export default function AdminMenuDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const currentMenuPromise = params.then((params) => getMenuByIdActionPrivate(params.id));
  const menusPromise = getAllMenusActionPrivate();
  const availableSortOrdersPromise = currentMenuPromise.then((res) =>
    getAvailableSortOrdersActionPrivate(res.data?.parent?.id || ''),
  );

  return (
    <Suspense fallback={<AdminMenuDetailPageContentSkeleton />}>
      <AdminMenuDetailPageContent
        currentMenuPromise={currentMenuPromise}
        menusPromise={menusPromise}
        availableSortOrdersPromise={availableSortOrdersPromise}
      />
    </Suspense>
  );
}
