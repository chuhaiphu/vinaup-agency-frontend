import '@mantine/dates/styles.css';
import '@mantine/tiptap/styles.css';

import { Suspense } from 'react';

import { getMeActionPrivate } from '@/actions/auth-actions';
import AdminLayoutContent from '@/components/admin/layout/admin-layout-content/admin-layout-content';

export default async function AdminLayoutRoot({ children }: { children: React.ReactNode }) {
  const userDataPromise = getMeActionPrivate();

  return (
    <Suspense>
      <AdminLayoutContent userDataPromise={userDataPromise}>{children}</AdminLayoutContent>
    </Suspense>
  );
}
