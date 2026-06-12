import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { getAllBlogsActionPublic, getBlogByEndpointActionPublic } from '@/actions/blog-actions';
import {
  getAllBlogCategoriesActionPublic,
  getBlogCategoryByEndpointActionPublic,
} from '@/actions/blog-category-actions';
import LandingBlogCategoryPageContent from '@/components/landing/blogs/landing-blog-category-page/landing-blog-category-page-content';
import LandingBlogCategoryPageContentSkeleton from '@/components/landing/blogs/landing-blog-category-page/landing-blog-category-page-content-skeleton';
import LandingBlogDetailPageContent from '@/components/landing/blogs/landing-blog-detail-page-content/landing-blog-detail-page-content';
import LandingBlogDetailSkeleton from '@/components/landing/blogs/landing-blog-detail-page-content/landing-blog-detail-skeleton';

const BLOG_ENDPOINT_PLACEHOLDER = '__placeholder__';

export async function generateStaticParams() {
  const [blogsResponse, categoriesResponse] = await Promise.all([
    getAllBlogsActionPublic(),
    getAllBlogCategoriesActionPublic(),
  ]);

  const blogParams =
    blogsResponse.success && blogsResponse.data
      ? blogsResponse.data.map((blog) => ({ endpoint: blog.endpoint }))
      : [];

  const categoryParams =
    categoriesResponse.success && categoriesResponse.data
      ? categoriesResponse.data
          .filter((category) => category.endpoint !== '__root__')
          .map((category) => ({ endpoint: category.endpoint }))
      : [];

  const params = [...blogParams, ...categoryParams];

  return params.length > 0 ? params : [{ endpoint: BLOG_ENDPOINT_PLACEHOLDER }];
}

export async function generateMetadata(
  { params }: { params: Promise<{ endpoint: string }> },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { endpoint } = await params;
  const resolvedParent = await parent;

  const blogResponse = await getBlogByEndpointActionPublic(endpoint);
  if (blogResponse.success && blogResponse.data) {
    const blog = blogResponse.data;
    const description = blog.content
      ? blog.content.replace(/<[^>]*>/g, '').substring(0, 160)
      : 'Khám phá các mẹo chăm sóc tóc, cảm hứng tạo kiểu và chia sẻ từ Jena Hair';

    return {
      title: blog.title,
      description,
      openGraph: {
        ...resolvedParent.openGraph,
        url: `https://jenahair.com/blogs/${endpoint}`,
        title: blog.title,
        description,
        images: blog.mainImageUrl ? [blog.mainImageUrl] : [],
      },
      alternates: {
        canonical: `https://jenahair.com/blogs/${endpoint}`,
      },
    };
  }

  const categoryResponse = await getBlogCategoryByEndpointActionPublic(endpoint);
  if (categoryResponse.success && categoryResponse.data) {
    const category = categoryResponse.data;
    const description = category.description
      ? category.description.replace(/<[^>]*>/g, '').substring(0, 160)
      : 'Khám phá các mẹo chăm sóc tóc, cảm hứng tạo kiểu và chia sẻ từ Jena Hair';

    return {
      title: category.title,
      description,
      openGraph: {
        ...resolvedParent.openGraph,
        url: `https://jenahair.com/blogs/${endpoint}`,
        title: category.title,
        description,
        images: category.mainImageUrl ? [category.mainImageUrl] : [],
      },
      alternates: {
        canonical: `https://jenahair.com/blogs/${endpoint}`,
      },
    };
  }

  return { title: 'Blog Not Found' };
}

type BlogEndpointPageProps = {
  params: Promise<{ endpoint: string }>;
  searchParams: Promise<{ q?: string; destinations?: string }>;
};

export default async function BlogEndpointPage({ params, searchParams }: BlogEndpointPageProps) {
  const { endpoint } = await params;

  if (endpoint === BLOG_ENDPOINT_PLACEHOLDER) {
    notFound();
  }

  const blogResponse = await getBlogByEndpointActionPublic(endpoint);
  if (blogResponse.success && blogResponse.data) {
    return (
      <Suspense fallback={<LandingBlogDetailSkeleton />}>
        <LandingBlogDetailPageContent params={params} />
      </Suspense>
    );
  }

  const categoryResponse = await getBlogCategoryByEndpointActionPublic(endpoint);
  if (categoryResponse.success && categoryResponse.data) {
    return (
      <Suspense fallback={<LandingBlogCategoryPageContentSkeleton />}>
        <LandingBlogCategoryPageContent
          category={categoryResponse.data}
          searchParams={searchParams}
        />
      </Suspense>
    );
  }

  notFound();
}
