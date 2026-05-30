import { Container, Title, Text, Box, Group } from '@mantine/core';
import { MOCK_BLOGS, MOCK_CATEGORIES } from '@/mocks/tech-news-data.mock';
import { notFound } from 'next/navigation';
import TinCongNgheCategoryTags from '@/components/landing/tin-cong-nghe/tin-cong-nghe-category-tags/tin-cong-nghe-category-tags';
import TinCongNgheGrid from '@/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-grid';
import { HeroCarousel, VideoSection } from '@vinaup/ui/landing';
import {
  VinaupPriceTagIcon,
  VinaupHeartIcon,
  VinaupEyeIcon,
  VinaupCopyIcon,
  VinaupLocationIcon
} from '@vinaup/ui/cores';
import classes from './page.module.scss';

export async function generateStaticParams() {
  const blogParams = MOCK_BLOGS.map((blog) => ({ endpoint: blog.endpoint }));
  const categoryParams = MOCK_CATEGORIES.filter(c => c.endpoint).map((cat) => ({ endpoint: cat.endpoint }));
  return [...blogParams, ...categoryParams];
}

export default async function TinCongNgheEndpointPage({
  params,
}: {
  params: Promise<{ endpoint: string }>;
}) {
  const { endpoint } = await params;

  // Check if it's a category
  const category = MOCK_CATEGORIES.find((c) => c.endpoint === endpoint);

  if (category) {
    const categoryBlogs = MOCK_BLOGS.filter(b => b.categoryEndpoint === category.endpoint);
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
          <TinCongNgheGrid blogs={categoryBlogs} />
        </Container>
      </div>
    );
  }

  // Check if it's a blog detail
  const blog = MOCK_BLOGS.find((b) => b.endpoint === endpoint);

  if (blog) {
    const defaultCategory = MOCK_CATEGORIES.find(c => c.endpoint === blog.categoryEndpoint);
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
                <VinaupEyeIcon size={18} fill="var(--vinaup-soft-crimson)" stroke="var(--vinaup-soft-crimson)" />
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
                blog.galleryImages
                  ? blog.galleryImages.map((img, idx) => ({ id: `${blog.id}-${idx}`, image: img, alt: `${blog.title} ${idx + 1}` }))
                  : [{ id: blog.id, image: blog.mainImageUrl, alt: blog.title }]
              }
              ratio={2 / 1}
            />
          </Box>

          <Box mt={{ base: '1rem', md: '2rem' }} className={classes.detailContent} dangerouslySetInnerHTML={{ __html: blog.content }} />

          <Group gap="xs" mt="sm">
            <VinaupLocationIcon size={20} fill="var(--vinaup-soft-crimson)" />
            <Text size="md">Dong Nai, Ho Chi Minh</Text>
          </Group>

          <Box mt={{ base: '1rem', md: '2rem' }}>
            <VideoSection url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title={blog.title} height={500} />
          </Box>
        </Container>
      </div>
    );
  }

  notFound();
}
