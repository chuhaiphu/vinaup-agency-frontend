import { Paper } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

import classes from './admin-user-detail-page-content.module.scss';

export default function AdminUserDetailPageContentSkeleton() {
  return (
    <div className={classes.adminUserDetailPageRoot}>
      <Skeleton width={160} height={28} borderRadius={4} className={classes.pageHeader} />

      {/* User details block */}
      <Paper p="lg" mb="lg" withBorder>
        <Skeleton height={120} borderRadius={4} />
      </Paper>

      {/* Change password block */}
      <Paper p="lg" classNames={{ root: classes.paperBlock }}>
        <Skeleton height={140} borderRadius={4} />
      </Paper>
    </div>
  );
}
