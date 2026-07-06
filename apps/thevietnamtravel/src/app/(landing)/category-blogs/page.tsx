import { Suspense } from 'react';
import { Container, SimpleGrid, Paper, Title, Text, Stack, Center, Loader } from '@mantine/core';
import BlogCard from '@/components/primitives/blog-card/blog-card';
import ServerPagination from '@/components/primitives/server-pagination/server-pagination';
import classes from './page.module.scss';

// Mock Data matching the screenshot
const MOCK_BLOGS = Array.from({ length: 40 }).map((_, index) => ({
  id: index,
  title: 'Title blog Vietnam travel Title blog Vietnam travel',
  // Using a mock image from the existing ones
  imageUrl: '/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg',
  href: '#',
}));

const ITEMS_PER_PAGE = 12;

async function CategoryBlogsPageWrapper({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParamsPromise;

  const totalBlogs = MOCK_BLOGS.length;
  const totalPages = Math.max(1, Math.ceil(totalBlogs / ITEMS_PER_PAGE));

  let currentPage = 1;
  if (typeof resolvedSearchParams.page === 'string') {
    currentPage = parseInt(resolvedSearchParams.page, 10);
  }

  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentBlogs = MOCK_BLOGS.slice(startIndex, endIndex);

  return (
    <Container size="xl" classNames={{ root: classes.pageRoot }} pb="xl" pt={0}>
      <Stack gap="md">
        {/* Banner Section */}
        <Paper radius="lg" className={classes.banner} p="20px">
          <Title order={1} className={classes.bannerTitle} mb="md">
            Title Category [h1]
          </Title>
          <Text className={classes.bannerDesc}>
            Overview in Vietnam and Vietnam have many places for Overview in Vietnam and Vietnam have many places for
            Overview in Vietnam and Vietnam have many places for Overview in Vietnam and Vietnam have many places for
          </Text>
        </Paper>

        {/* Grid Section */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
          spacing="lg"
          verticalSpacing="lg"
        >
          {currentBlogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </SimpleGrid>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <ServerPagination totalPages={totalPages} currentPage={currentPage} color="var(--vinaup-green)" />
        </div>
      </Stack>
    </Container>
  );
}

export default function CategoryBlogsPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <Suspense
      fallback={
        <Center py="3rem">
          <Loader color="var(--vinaup-green)" />
        </Center>
      }
    >
      <CategoryBlogsPageWrapper searchParamsPromise={props.searchParams} />
    </Suspense>
  );
}
