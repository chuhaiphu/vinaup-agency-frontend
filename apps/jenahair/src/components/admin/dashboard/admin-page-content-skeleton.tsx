import { Group } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

import classes from './admin-page-content.module.scss';

export default function AdminPageContentSkeleton() {
  return (
    <div className={classes.adminPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Skeleton width={160} height={28} borderRadius={4} />
      </Group>

      <div className={classes.tabsWrapper}>
        {/* Tab bar */}
        <Skeleton width={180} height={36} borderRadius={4} />
        {/* Contacts table */}
        <Skeleton height={360} borderRadius={4} style={{ marginTop: 16 }} />
      </div>
    </div>
  );
}
