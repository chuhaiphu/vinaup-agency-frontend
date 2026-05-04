import { getAllCustomerContactsActionPrivate } from '@/actions/customer-contact-action';
import AdminPageContent from '@/components/admin/dashboard/admin-page-content';
import { Suspense } from 'react';

export default async function AdminPage() {
  const customerContactsResultPromise = getAllCustomerContactsActionPrivate().then((res) => res.data || []);

  return (
    <Suspense>
      <AdminPageContent
        customerContactsPromise={customerContactsResultPromise}
      />
    </Suspense>
  );
}
