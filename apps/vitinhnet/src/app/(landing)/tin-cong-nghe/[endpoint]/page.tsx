import { Container, Title, Text, Box, Group } from '@mantine/core';
import {
  VinaupPriceTagIcon,
  VinaupHeartIcon,
  VinaupEyeIcon,
  VinaupCopyIcon,
  VinaupLocationIcon,
} from '@vinaup/ui/cores';
import { HeroCarousel, VideoSection } from '@vinaup/ui/landing';
import { notFound } from 'next/navigation';

import {
  getAllTechNewsActionPublic,
  getTechNewsByEndpointActionPublic,
} from '@/actions/tech-news-actions';
import TinCongNgheCategoryTags from '@/components/landing/tin-cong-nghe/tin-cong-nghe-category-tags/tin-cong-nghe-category-tags';
import TinCongNgheGrid from '@/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-grid';
import { TECH_NEWS_CATEGORIES } from '@/constants/tech-news-constants';

import classes from './page.module.scss';

export async function generateStaticParams() {
  const result = await getAllTechNewsActionPublic();
  const blogParams = (result.data ?? []).map((article) => ({ endpoint: article.endpoint }));
  const categoryParams = TECH_NEWS_CATEGORIES.filter((c) => c.endpoint).map((cat) => ({
    endpoint: cat.endpoint,
  }));
  return [...blogParams, ...categoryParams];
}

export default async function TinCongNgheEndpointPage(props: {
  params: Promise<{ endpoint: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { endpoint } = await props.params;
  const searchParams = await props.searchParams;

  // Check if it's a category
  const category = TECH_NEWS_CATEGORIES.find((c) => c.endpoint === endpoint);

  if (category) {
    const categoryResult = await getAllTechNewsActionPublic({
      categoryEndpoint: category.endpoint,
    });
    const allCategoryBlogs = categoryResult.data ?? [];

    const ITEMS_PER_PAGE = 16;
    let currentPage = 1;
    if (typeof searchParams.page === 'string') {
      currentPage = parseInt(searchParams.page, 10);
    }
    if (isNaN(currentPage) || currentPage < 1) currentPage = 1;

    const totalPages = Math.max(1, Math.ceil(allCategoryBlogs.length / ITEMS_PER_PAGE));
    if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const categoryBlogs = allCategoryBlogs.slice(start, start + ITEMS_PER_PAGE);

    return (
      <div className={classes.categoryPageWrapper}>
        <Container size="xl" pt={{ base: '1rem', md: '2rem' }}>
          <Box className={classes.categoryHeader}>
            <Title order={1} className={classes.categoryTitle}>
              {category.title}
            </Title>
          </Box>

          <Box mb="1rem">
            <TinCongNgheCategoryTags activeEndpoint={endpoint} />
          </Box>
        </Container>

        <Container size="xl" pb="4rem">
          <TinCongNgheGrid blogs={categoryBlogs} totalPages={totalPages} currentPage={currentPage} />
        </Container>
      </div>
    );
  }

  // Check if it's a blog detail
  const blogResult = await getTechNewsByEndpointActionPublic(endpoint);
  const blog = blogResult.success ? blogResult.data : undefined;

  if (blog) {
    const defaultCategory = TECH_NEWS_CATEGORIES.find((c) => c.endpoint === blog.categoryEndpoint);
    const categoryName = defaultCategory?.title || 'Tin tức';

    return (
      <div className={classes.detailPageWrapper}>
        <Container size="lg" py={{ base: '1rem', md: '2rem' }}>
          <Title order={1} mb="1rem" className={classes.detailTitle}>
            {blog.title}
          </Title>

          <Group justify="space-between" mb="1rem">
            <Group gap="xs">
              <VinaupPriceTagIcon size={24} fill="var(--vinaup-soft-crimson)" />
              <Text className={classes.detailCategory}>{categoryName}</Text>
            </Group>

            <Group gap="md">
              <Group gap={4} style={{ cursor: 'pointer' }}>
                <VinaupHeartIcon size={18} fill="var(--vinaup-soft-crimson)" />
                <Text fz="lg">{blog.likes}</Text>
              </Group>
              <Group gap={4}>
                <VinaupEyeIcon
                  size={18}
                  fill="var(--vinaup-soft-crimson)"
                  stroke="var(--vinaup-soft-crimson)"
                />
                <Text fz="lg">{blog.views}</Text>
              </Group>
              <Group gap={4} style={{ cursor: 'pointer' }}>
                <VinaupCopyIcon size={18} fill="var(--vinaup-soft-crimson)" />
                <Text fz="lg">Link</Text>
              </Group>
            </Group>
          </Group>

          <Box className={classes.detailCarouselWrapper}>
            <HeroCarousel
              data={
                blog.galleryImageUrls
                  ? blog.galleryImageUrls.map((img, idx) => ({
                      id: `${blog.id}-${idx}`,
                      image: img,
                      alt: `${blog.title} ${idx + 1}`,
                    }))
                  : [{ id: blog.id, image: blog.mainImageUrl, alt: blog.title }]
              }
              ratio={2 / 1}
            />
          </Box>

          <Box
            mt={{ base: '1rem', md: '2rem' }}
            className={classes.detailContent}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <Group gap="xs" mt="sm">
            <VinaupLocationIcon size={20} fill="var(--vinaup-soft-crimson)" />
            <Text size="md">Dong Nai, Ho Chi Minh</Text>
          </Group>

          <Box mt={{ base: '1rem', md: '2rem' }}>
            <VideoSection
              url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              title={blog.title}
              height={500}
            />
          </Box>
        </Container>
      </div>
    );
  }

  notFound();
}
