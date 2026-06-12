import { Group, Text } from '@mantine/core';
import { Suspense } from 'react';

import { getAllPagesAdminActionPrivate } from '@/actions/page-actions';
import CreatePageAction from '@/components/admin/page/create-page-action/create-page-action';
import PagesTable from '@/components/admin/page/pages-table/pages-table';
import PagesTableSkeleton from '@/components/admin/page/pages-table/pages-table-skeleton';

import classes from './page.module.scss';

export default async function AdminPagePage() {
  const pagesDataPromise = getAllPagesAdminActionPrivate().then((res) => {
    if (!res.success || !res.data) {
      return [];
    }
    return res.data;
  });

  return (
    <div className={classes.adminPagePageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Page</Text>
        <Group gap="xs">
          <CreatePageAction />
        </Group>
      </Group>
      <Suspense fallback={<PagesTableSkeleton />}>
        <PagesTable pagesDataPromise={pagesDataPromise} />
      </Suspense>
    </div>
  );
}
