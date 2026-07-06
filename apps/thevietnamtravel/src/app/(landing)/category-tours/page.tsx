import { Suspense } from 'react';
import { Container, SimpleGrid, Paper, Title, Text, Stack, Center, Loader } from '@mantine/core';
import TourCard from '@/components/primitives/tour-card/tour-card';
import ServerPagination from '@/components/primitives/server-pagination/server-pagination';
import classes from './page.module.scss';

// Mock Data matching the screenshot
const MOCK_TOURS = Array.from({ length: 40 }).map((_, index) => ({
  id: index,
  title: 'Tour Pickleball noi bat 2345 Dalat Tour Pickleball noi bat 2345 Dalat Tour Pickleball noi bat 2345 Dalat',
  // Using a mock image from the existing ones
  imageUrl: '/mock-images/z6005041616453_ab9be89ca94e5e8d8caff5c6cbd85233-1.jpg',
  price: 'đ 12.000.000',
  href: '#',
}));

const ITEMS_PER_PAGE = 8;

async function CategoryToursPageWrapper({
  searchParamsPromise,
}: {
  searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParamsPromise;

  const totalTours = MOCK_TOURS.length;
  const totalPages = Math.max(1, Math.ceil(totalTours / ITEMS_PER_PAGE));

  let currentPage = 1;
  if (typeof resolvedSearchParams.page === 'string') {
    currentPage = parseInt(resolvedSearchParams.page, 10);
  }

  if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTours = MOCK_TOURS.slice(startIndex, endIndex);

  return (
    <Container size="xl" classNames={{ root: classes.pageRoot }} pb="xl" pt={0}>
      <Stack gap="md">
        {/* Banner Section */}
        <Paper radius="lg" className={classes.banner} p="20px">
          <Title order={1} className={classes.bannerTitle} mb="md">
            Title Category [h1][h1]
          </Title>
          <Text className={classes.bannerDesc}>
            Overview in Vietnam and Vietnam have many places for Overview in Vietnam and Vietnam have many places for
            Overview in Vietnam and Vietnam have many places for Overview in Vietnam and Vietnam have many places for
          </Text>
        </Paper>

        {/* Grid Section */}
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing="lg"
          verticalSpacing="lg"
        >
          {currentTours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </SimpleGrid>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <ServerPagination totalPages={totalPages} currentPage={currentPage} color="var(--vinaup-green)" />
        </div>
      </Stack>
    </Container>
  );
}

export default function CategoryToursPage(props: {
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
      <CategoryToursPageWrapper searchParamsPromise={props.searchParams} />
    </Suspense>
  );
}
