import { Group, Text } from '@mantine/core';
import { Suspense } from 'react';

import { getAllBlogsActionPrivate } from '@/actions/blog-actions';
import BlogsTable from '@/components/admin/blogs/blogs-table/blogs-table';
import BlogsTableSkeleton from '@/components/admin/blogs/blogs-table/blogs-table-skeleton';
import CreateBlogAction from '@/components/admin/blogs/create-blog-action/create-blog-action';

import classes from './page.module.scss';

export default async function AdminBlogCategoryPage() {
  const blogsDataPromise = getAllBlogsActionPrivate().then((res) => {
    if (!res.success || !res.data) {
      return [];
    }
    return res.data;
  });

  return (
    <div className={classes.adminBlogCategoryPageRoot}>
      <Group className={classes.pageHeader} justify="space-between">
        <Text size="xl">Blog</Text>
        <Group gap="xs">
          <CreateBlogAction />
        </Group>
      </Group>
      <Suspense fallback={<BlogsTableSkeleton />}>
        <BlogsTable blogsDataPromise={blogsDataPromise} />
      </Suspense>
    </div>
  );
}
