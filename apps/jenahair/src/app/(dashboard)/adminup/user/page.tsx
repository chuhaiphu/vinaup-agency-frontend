import { Group, Text } from '@mantine/core';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import { getMeActionPrivate } from '@/actions/auth-actions';
import { getAllUsersActionPrivate } from '@/actions/user-actions';
import UsersTable from '@/components/admin/user/users-table/users-table';
import UsersTableSkeleton from '@/components/admin/user/users-table/users-table-skeleton';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { UserResponse } from '@/interfaces/user-interfaces';

import classes from './page.module.scss';

export default async function AdminUserPage() {
  const usersDataPromise = getAllUsersActionPrivate().then((res) => {
    if (!res) return [];
    return res;
  });

  const currentUserPromise = getMeActionPrivate().then((res) => {
    if (!res) return null;
    return res;
  });

  return (
    <div className={classes.adminUserPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">User Management</Text>
      </Group>
      <Suspense>
        <AdminUserHiddenGuard currentUserPromise={currentUserPromise} />
      </Suspense>
      <Suspense fallback={<UsersTableSkeleton />}>
        <UsersTable usersDataPromise={usersDataPromise} />
      </Suspense>
    </div>
  );
}

interface AdminUserHiddenGuardProps {
  currentUserPromise: Promise<ActionResponse<UserResponse> | null>;
}
const AdminUserHiddenGuard = async ({ currentUserPromise }: AdminUserHiddenGuardProps) => {
  const currentUserData = await currentUserPromise;
  if (!currentUserData || !currentUserData.data || currentUserData.data.role !== 'supadmin') {
    redirect('/adminup');
  }

  return null;
};
