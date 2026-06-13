import { Suspense } from 'react';

import { getAllCustomerContactsActionPrivate } from '@/actions/customer-contact-actions';
import AdminPageContent from '@/components/admin/dashboard/admin-page-content';
import AdminPageContentSkeleton from '@/components/admin/dashboard/admin-page-content-skeleton';

export default async function AdminPage() {
  const customerContactsResultPromise = getAllCustomerContactsActionPrivate().then(
    (res) => res.data || [],
  );

  return (
    <Suspense fallback={<AdminPageContentSkeleton />}>
      <AdminPageContent customerContactsPromise={customerContactsResultPromise} />
    </Suspense>
  );
}
