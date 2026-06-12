import { Box, Container, Stack } from '@mantine/core';
import { Skeleton } from '@vinaup/ui/landing';

import BlogCategoryTagsSkeleton from '@/components/landing/blogs/blog-category-tags/blog-category-tags-skeleton';
import BlogGridSkeleton from '@/components/landing/blogs/blog-grid/blog-grid-skeleton';

import classes from './landing-blog-category-page-content.module.scss';

const DESCRIPTION_LINES = [92, 86, 78];

export default function LandingBlogCategoryPageContentSkeleton() {
  return (
    <div className={classes.blogCategoryPage}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.blogCategoryHeader}>
        <Container size={'xl'}>
          <Box style={{ width: '50%', margin: '0 auto' }}>
            <Skeleton height={36} borderRadius={6} />
          </Box>
        </Container>
      </Box>

      {/* --- 2. INTRO SECTION --- */}
      <Container size={'xl'} className={classes.blogCategoryIntro}>
        <BlogCategoryTagsSkeleton />
        <Stack gap="sm" mt={'sm'}>
          {DESCRIPTION_LINES.map((width, index) => (
            <Skeleton key={index} width={`${width}%`} height={20} borderRadius={6} />
          ))}
        </Stack>
      </Container>

      <Container size="xl">
        <BlogGridSkeleton />
      </Container>
    </div>
  );
}
