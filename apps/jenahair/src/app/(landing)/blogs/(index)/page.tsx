import { Stack, Box, Container } from '@mantine/core';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { getAllBlogsActionPublic } from '@/actions/blog-actions';
import BlogCategoryTags from '@/components/landing/blogs/blog-category-tags/blog-category-tags';
import BlogCategoryTagsSkeleton from '@/components/landing/blogs/blog-category-tags/blog-category-tags-skeleton';
import BlogGrid from '@/components/landing/blogs/blog-grid/blog-grid';
import BlogGridSkeleton from '@/components/landing/blogs/blog-grid/blog-grid-skeleton';

import classes from './page.module.scss';

export const metadata: Metadata = { title: 'Blog' };
export type BlogIndexPageQueryParams = {
  q?: string;
  destinations?: string;
};

async function BlogIndexPageContent({
  searchParams,
}: {
  searchParams: Promise<BlogIndexPageQueryParams>;
}) {
  const blogsResponse = await getAllBlogsActionPublic();
  const queryParams = await searchParams;
  const blogsData = blogsResponse.data || [];

  return <BlogGrid queryParams={queryParams} blogs={blogsData} />;
}

export default async function BlogsIndexPage({
  searchParams,
}: {
  searchParams: Promise<BlogIndexPageQueryParams>;
}) {
  return (
    <div className={classes.pageWrapper}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.orangeHeader}>
        <Container size={'xl'}>
          <h1 className={classes.h1Title}>Blog</h1>
        </Container>
      </Box>

      {/* --- 2. CATEGORY TAGS --- */}
      <Container size={'xl'} className={classes.categorySection}>
        <Stack gap="sm">
          <Suspense fallback={<BlogCategoryTagsSkeleton />}>
            <BlogCategoryTags />
          </Suspense>
        </Stack>
      </Container>

      {/* --- 3. BLOGS GRID --- */}
      <Container size="xl">
        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogIndexPageContent searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}
