import { Suspense } from 'react';

import { getBlogByIdActionPrivate } from '@/actions/blog-actions';
import { getAllBlogCategoriesActionPrivate } from '@/actions/blog-category-actions';
import AdminBlogDetailPageContent from '@/components/admin/blogs/admin-blog-detail-page-content/admin-blog-detail-page-content';

export default function AdminBlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const currentBlogPromise = params.then((params) => getBlogByIdActionPrivate(params.id));
  const blogCategoriesPromise = getAllBlogCategoriesActionPrivate();

  return (
    <Suspense>
      <AdminBlogDetailPageContent
        currentBlogPromise={currentBlogPromise}
        blogCategoriesPromise={blogCategoriesPromise}
      />
    </Suspense>
  );
}
