import { Grid, GridCol, Group, Text } from '@mantine/core';
import { Suspense } from 'react';

import { getAllDiaryCategoriesActionPrivate } from '@/actions/diary-category-actions';
import CreateDiaryCategoryAction from '@/components/admin/diary/create-diary-category-action/create-diary-category-action';
import DiaryCategoryNav from '@/components/landing/layout/diary-category-nav/diary-category-nav';
import DiaryCategoryNavSkeleton from '@/components/landing/layout/diary-category-nav/diary-category-nav-skeleton';

import classes from './layout.module.scss';

export default async function AdminDiaryCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const diaryCategoriesDataPromise = getAllDiaryCategoriesActionPrivate();

  return (
    <div className={classes.adminDiaryCategoryLayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Diary Category</Text>
        <CreateDiaryCategoryAction />
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <Suspense fallback={<DiaryCategoryNavSkeleton />}>
            <DiaryCategoryNav diaryCategoriesDataPromise={diaryCategoriesDataPromise} />
          </Suspense>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>{children}</GridCol>
      </Grid>
    </div>
  );
}
