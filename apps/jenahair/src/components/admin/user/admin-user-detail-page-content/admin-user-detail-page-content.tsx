'use client';

import { Paper, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import { use } from 'react';

import UserDetailForm from '@/components/admin/user/user-detail-form/user-detail-form';
import { UserResponse } from '@/interfaces/user-interfaces';

import classes from './admin-user-detail-page-content.module.scss';
import UserDetailsBlock from './user-details-block/user-details-block';

interface AdminUserDetailPageContentProps {
  currentUserPromise: Promise<UserResponse | undefined>;
}

export default function AdminUserDetailPageContent({
  currentUserPromise,
}: AdminUserDetailPageContentProps) {
  const currentUser = use(currentUserPromise);

  if (!currentUser) {
    notFound();
  }

  return (
    <div className={classes.adminUserDetailPageRoot}>
      <Text size="xl" className={classes.pageHeader}>
        User Details
      </Text>

      <UserDetailsBlock user={currentUser} />

      <Paper p="lg" className={classes.paperBlock}>
        <Text size="lg" mb="lg">
          Change Password
        </Text>

        <UserDetailForm userId={currentUser.id} />
      </Paper>
    </div>
  );
}
