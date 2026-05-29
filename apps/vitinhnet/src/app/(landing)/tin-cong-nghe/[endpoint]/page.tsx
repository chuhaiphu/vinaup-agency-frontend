import { Container, Title, Text, Box, Breadcrumbs, Anchor } from '@mantine/core';
import { MOCK_BLOGS, MOCK_CATEGORIES } from '@/components/landing/tin-cong-nghe/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import TinCongNgheCategoryTags from '@/components/landing/tin-cong-nghe/tin-cong-nghe-category-tags/tin-cong-nghe-category-tags';
import TinCongNgheGrid from '@/components/landing/tin-cong-nghe/tin-cong-nghe-grid/tin-cong-nghe-grid';
import classes from './page.module.scss';
import { Route } from 'next';

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
    const categoryLink = defaultCategory?.endpoint ? `/tin-cong-nghe/${defaultCategory.endpoint}` : '/tin-cong-nghe';

    const items = [
      { title: 'Trang chủ', href: '/' },
      { title: 'Tin công nghệ', href: '/tin-cong-nghe' },
      { title: categoryName, href: categoryLink },
      { title: blog.title, href: '#' },
    ].map((item, index) => (
      <Link href={item.href as Route} key={index} passHref legacyBehavior>
        <Anchor className={classes.breadcrumbAnchor}>
          {item.title}
        </Anchor>
      </Link>
    ));

    return (
      <div className={classes.detailPageWrapper}>
        <Container size="lg" pt="2rem">
          <Breadcrumbs mb="2rem">{items}</Breadcrumbs>
          
          <Title order={1} mb="1rem" className={classes.detailTitle}>
            {blog.title}
          </Title>
          
          <Text c="dimmed" mb="2rem">
            Lượt xem: {blog.views} • Yêu thích: {blog.likes}
          </Text>

          <Box className={classes.detailImageWrapper}>
            <Image
              fill
              src={blog.mainImageUrl || 'https://placehold.co/1200x675?text=ViTinhNet'}
              alt={blog.title}
              className={classes.detailImage}
            />
          </Box>

          <Box className={classes.detailContent} dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Container>
      </div>
    );
  }

  notFound();
}
