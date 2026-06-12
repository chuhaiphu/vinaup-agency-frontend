import { Box, Container, Stack } from '@mantine/core';
import { VideoSection } from '@vinaup/ui/landing';
import { Suspense } from 'react';

import { getBlogCategoryBlogsByBlogCategoryIdActionPublic } from '@/actions/blog-category-blog-actions';
import BlogCategoryTags from '@/components/landing/blogs/blog-category-tags/blog-category-tags';
import BlogCategoryTagsSkeleton from '@/components/landing/blogs/blog-category-tags/blog-category-tags-skeleton';
import BlogGrid from '@/components/landing/blogs/blog-grid/blog-grid';
import { BlogCategoryResponse } from '@/interfaces/blog-category-interfaces';
import { BlogResponse } from '@/interfaces/blog-interfaces';

import classes from './landing-blog-category-page-content.module.scss';

type LandingBlogCategoryPageContentProps = {
  category: BlogCategoryResponse;
  searchParams: Promise<{ q?: string; destinations?: string }>;
};

const isHtmlDescriptionEmpty = (html: string | null | undefined): boolean => {
  if (!html) return true;
  const trimmed = html.trim();
  return trimmed === '' || trimmed === '<p></p>';
};

export default async function LandingBlogCategoryPageContent({
  category,
  searchParams,
}: LandingBlogCategoryPageContentProps) {
  const queryParams = await searchParams;

  const blogCategoryBlogsResponse = await getBlogCategoryBlogsByBlogCategoryIdActionPublic(
    category.id,
  );

  const blogsInCategory: BlogResponse[] =
    blogCategoryBlogsResponse.success && blogCategoryBlogsResponse.data
      ? blogCategoryBlogsResponse.data
          .map((bcb) => bcb.blog)
          .filter(
            (blog): blog is BlogResponse => blog !== undefined && blog.visibility === 'public',
          )
      : [];

  const sortedBlogs = [...blogsInCategory]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const renderVideoSection = () => {
    if (!category.videoUrl) {
      return null;
    }
    return (
      <VideoSection
        url={category.videoUrl}
        title={category.title}
        height={480}
        thumbnailUrl={category.videoThumbnailUrl || undefined}
      />
    );
  };

  return (
    <div className={classes.blogCategoryPage}>
      {/* --- 1. ORANGE HEADER --- */}
      <Box className={classes.blogCategoryHeader}>
        <Container size={'xl'}>
          <h1 className={classes.blogCategoryTitle}>{category.title}</h1>
        </Container>
      </Box>

      {/* --- 2. INTRO SECTION --- */}
      <Container size={'xl'} className={classes.blogCategoryIntro}>
        <Suspense fallback={<BlogCategoryTagsSkeleton />}>
          <BlogCategoryTags activeEndpoint={category.endpoint} />
        </Suspense>
        <Box mt={'sm'}>{category.videoPosition === 'top' && renderVideoSection()}</Box>
        <Stack gap="sm" mt={'sm'}>
          {!isHtmlDescriptionEmpty(category.description) && (
            <div
              className={classes.blogCategoryDescription}
              dangerouslySetInnerHTML={{ __html: category.description ?? '' }}
            />
          )}
        </Stack>
      </Container>

      <Container size="xl">
        <BlogGrid queryParams={queryParams} blogs={sortedBlogs} />
      </Container>

      {category.videoPosition !== 'top' && (
        <Container size="xl" p={0}>
          {renderVideoSection()}
        </Container>
      )}
    </div>
  );
}
