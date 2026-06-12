import { Paper, Text } from '@mantine/core';

import { getUserByIdActionPrivate } from '@/actions/user-actions';
import UserDetailForm from '@/components/admin/user/user-detail-form/user-detail-form';

import classes from './admin-user-detail-page-content.module.scss';
import UserDetailsBlock from './user-details-block/user-details-block';

interface AdminUserDetailPageContentProps {
  params: Promise<{ id: string }>;
}

export default async function AdminUserDetailPageContent({
  params,
}: AdminUserDetailPageContentProps) {
  const { id } = await params;
  const currentUser = await getUserByIdActionPrivate(id);

  if (!currentUser) {
    return <div>User not found</div>;
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
