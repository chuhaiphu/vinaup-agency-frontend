'use client';
import { Grid, GridCol, Pagination, Text } from '@mantine/core';
import { Route } from 'next';
import Link from 'next/link';

import { ServerPagination } from '@/components/landing/common/server-pagination/server-pagination';

import { TechNewsArticleResponse } from '@/interfaces/tech-news-interfaces';

import classes from './tin-cong-nghe-grid.module.scss';
import TinCongNgheItem from './tin-cong-nghe-item';

export default function TinCongNgheGrid({
  blogs,
  totalPages,
  currentPage,
}: {
  blogs: TechNewsArticleResponse[];
  totalPages: number;
  currentPage: number;
}) {

  if (!blogs || blogs.length === 0) {
    return (
      <Text c="dimmed" fz="xl" ta="center" mt="xl">
        Không có bài viết nào
      </Text>
    );
  }



  return (
    <div>
      <Grid mt="lg" mb="md" gap="20px">
        {blogs.map((item) => (
          <GridCol span={{ base: 12, lg: 6 }} key={item.id}>
            <Link href={`/tin-cong-nghe/${item.endpoint}` as Route} className={classes.link}>
              <TinCongNgheItem item={item} />
            </Link>
          </GridCol>
        ))}
      </Grid>
      <div className={classes.paginationWrapper}>
        <ServerPagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </div>
  );
}
