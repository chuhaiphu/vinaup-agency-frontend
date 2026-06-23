import { Container, Stack, Box, Title } from '@mantine/core';

import { getAllTechNewsActionPublic } from '@/actions/tech-news-actions';
import TinCongNgheCategoryTags from '@/components/landing/tin-cong-nghe/tin-cong-nghe-category-tags/tin-cong-nghe-category-tags';
import TinCongNgheGrid from '@/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-grid';

import classes from './page.module.scss';

export const metadata = { title: 'Tin Công Nghệ | ViTinhNet' };

const ITEMS_PER_PAGE = 16;

export default async function TechNewsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const result = await getAllTechNewsActionPublic();
  const allArticles = result.data ?? [];
  
  const searchParams = await props.searchParams;
  let currentPage = 1;
  if (typeof searchParams.page === 'string') {
    currentPage = parseInt(searchParams.page, 10);
  }
  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

  const totalPages = Math.max(1, Math.ceil(allArticles.length / ITEMS_PER_PAGE));
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const articles = allArticles.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className={classes.pageWrapper}>
      <Container size="xl" pt={{ base: '1rem', md: '2rem' }}>
        {/* 1. HEADER */}
        <Box className={classes.header}>
          <Title order={2} className={classes.h1Title}>
            Tin Công Nghệ
          </Title>
        </Box>

        {/* 2. CATEGORY TAGS */}
        <Stack gap="sm" mb="1rem">
          <TinCongNgheCategoryTags />
        </Stack>
      </Container>

      {/* 3. BLOGS GRID */}
      <Container size="xl" pb={{ base: '1rem', md: '2rem' }}>
        <TinCongNgheGrid blogs={articles} totalPages={totalPages} currentPage={currentPage} />
      </Container>
    </div>
  );
}
