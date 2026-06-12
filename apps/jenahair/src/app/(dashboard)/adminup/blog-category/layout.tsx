import { Grid, GridCol, Group, Text } from '@mantine/core';
import { Suspense } from 'react';

import { getAllBlogCategoriesActionPrivate } from '@/actions/blog-category-actions';
import CreateBlogCategoryAction from '@/components/admin/blogs/create-blog-category-action/create-blog-category-action';
import BlogCategoryNav from '@/components/landing/layout/blog-category-nav/blog-category-nav';
import BlogCategoryNavSkeleton from '@/components/landing/layout/blog-category-nav/blog-category-nav-skeleton';

import classes from './layout.module.scss';

export default async function AdminBlogCategoryLayout({ children }: { children: React.ReactNode }) {
  const blogCategoriesDataPromise = getAllBlogCategoriesActionPrivate();

  return (
    <div className={classes.adminBlogCategoryLayoutRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Blog Category</Text>
        <CreateBlogCategoryAction />
      </Group>
      <Grid>
        <GridCol span={{ base: 12, sm: 12, md: 4, lg: 4, xl: 3 }}>
          <Suspense fallback={<BlogCategoryNavSkeleton />}>
            <BlogCategoryNav blogCategoriesDataPromise={blogCategoriesDataPromise} />
          </Suspense>
        </GridCol>
        <GridCol span={{ base: 12, sm: 12, md: 8, lg: 8, xl: 9 }}>{children}</GridCol>
      </Grid>
    </div>
  );
}
