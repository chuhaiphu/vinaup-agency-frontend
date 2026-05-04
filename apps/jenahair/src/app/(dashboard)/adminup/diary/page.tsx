import { Group, Text } from '@mantine/core';
import DiariesTable from '@/components/admin/diary/diaries-table/diaries-table';
import { getAllDiariesActionPrivate } from '@/actions/diary-action';
import classes from './page.module.scss';
import CreateDiaryAction from '@/components/admin/diary/create-diary-action/create-diary-action';
import { Suspense } from 'react';
import DiariesTableSkeleton from '@/components/admin/diary/diaries-table/diaries-table-skeleton';

export default async function AdminDiaryPage() {
  const diariesDataPromise = getAllDiariesActionPrivate().then((res) => {
    if (!res.success || !res.data) {
      return [];
    }
    return res.data;
  });

  return (
    <div className={classes.adminDiaryPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Diary</Text>
        <Group gap="xs">
          <CreateDiaryAction />
        </Group>
      </Group>
      <Suspense fallback={<DiariesTableSkeleton />}>
        <DiariesTable diariesDataPromise={diariesDataPromise} />
      </Suspense>
    </div>
  );
}
