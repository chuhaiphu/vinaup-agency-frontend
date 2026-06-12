import { Suspense } from 'react';

import { getAllCustomerContactsActionPrivate } from '@/actions/customer-contact-actions';
import AdminPageContent from '@/components/admin/dashboard/admin-page-content';

export default async function AdminPage() {
  const customerContactsResultPromise = getAllCustomerContactsActionPrivate().then(
    (res) => res.data || [],
  );

  return (
    <Suspense>
      <AdminPageContent customerContactsPromise={customerContactsResultPromise} />
    </Suspense>
  );
}
