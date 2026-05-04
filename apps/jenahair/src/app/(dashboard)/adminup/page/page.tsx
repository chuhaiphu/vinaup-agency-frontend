import { Group, Text } from '@mantine/core';
import PagesTable from '@/components/admin/page/pages-table/pages-table';
import { getAllPagesAdminActionPrivate } from '@/actions/page-action';
import classes from './page.module.scss';
import CreatePageAction from '@/components/admin/page/create-page-action/create-page-action';
import { Suspense } from 'react';
import PagesTableSkeleton from '@/components/admin/page/pages-table/pages-table-skeleton';

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
