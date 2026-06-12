import { Stack } from '@mantine/core';
import { Route } from 'next';
import Link from 'next/link';

import { getAllBlogsActionPublic } from '@/actions/blog-actions';
import BlogItem from '@/components/landing/blogs/blog-grid/blog-item/blog-item';

import classes from './blogs-column.module.scss';

export async function BlogsColumn() {
  const result = await getAllBlogsActionPublic();
  const blogs = result.success ? (result.data ?? []).slice(0, 2) : [];
  const templateBlog = blogs[0] ?? blogs[1];

  const renderPlaceholderSlot = (key: string) => {
    if (templateBlog) {
      return (
        <div key={key} className={classes.hiddenTemplate} aria-hidden>
          <BlogItem item={templateBlog} />
        </div>
      );
    }

    return <div key={key} aria-hidden className={classes.emptyPlaceholder} />;
  };

  return (
    <Stack gap="lg" justify="space-start" className={classes.columnRoot}>
      {Array.from({ length: 2 }).map((_, index) => {
        const blog = blogs[index];
        if (!blog) {
          return renderPlaceholderSlot(`placeholder-${index}`);
        }

        return (
          <Link
            key={blog.id}
            href={`/blogs/${blog.endpoint}` as Route}
            className={classes.blogLink}
          >
            <BlogItem item={blog} />
          </Link>
        );
      })}
    </Stack>
  );
}
