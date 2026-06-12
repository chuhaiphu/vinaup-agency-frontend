import { Stack, Box, Container } from '@mantine/core';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { getAllDiariesActionPublic } from '@/actions/diary-actions';
import DiaryCategoryTags from '@/components/landing/diary/diary-category-tags/diary-category-tags';
import DiaryCategoryTagsSkeleton from '@/components/landing/diary/diary-category-tags/diary-category-tags-skeleton';
import DiaryGrid from '@/components/landing/diary/diary-grid/diary-grid';
import DiaryGridSkeleton from '@/components/landing/diary/diary-grid/diary-grid-skeleton';

import classes from './page.module.scss';

export const metadata: Metadata = { title: 'Nhật ký' };

export type DiaryCategoryPageQueryParams = {
  q?: string;
  destinations?: string;
};

async function DiaryIndexPageContent({
  searchParams,
}: {
  searchParams: Promise<DiaryCategoryPageQueryParams>;
}) {
  const diariesResponse = await getAllDiariesActionPublic();
  const queryParams = await searchParams;
  const diariesData = diariesResponse.data || [];

  return <DiaryGrid queryParams={queryParams} diaries={diariesData} />;
}

export default async function DiaryIndexPage({
  searchParams,
}: {
  searchParams: Promise<DiaryCategoryPageQueryParams>;
}) {
  return (
    <div className={classes.pageWrapper}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.orangeHeader}>
        <Container size={'xl'}>
          <h1 className={classes.h1Title}>Nhật ký</h1>
        </Container>
      </Box>

      {/* --- 2. INTRO SECTION --- */}
      <Container size={'xl'} className={classes.introSection}>
        <Stack gap="sm">
          <Suspense fallback={<DiaryCategoryTagsSkeleton />}>
            <DiaryCategoryTags />
          </Suspense>
        </Stack>
      </Container>

      <Container size="xl">
        <Suspense fallback={<DiaryGridSkeleton />}>
          <DiaryIndexPageContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}
