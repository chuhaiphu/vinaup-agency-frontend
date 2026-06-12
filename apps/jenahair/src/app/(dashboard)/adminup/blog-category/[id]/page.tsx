import { Suspense } from 'react';

import {
  getAllBlogCategoriesActionPrivate,
  getAvailableSortOrdersActionPrivate,
  getBlogCategoryByIdActionPrivate,
} from '@/actions/blog-category-actions';
import AdminBlogCategoryDetailPageContent from '@/components/admin/blogs/admin-blog-category-detail-page-content/admin-blog-category-detail-page-content';

export default function AdminBlogCategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const currentBlogCategoryPromise = params.then((params) =>
    getBlogCategoryByIdActionPrivate(params.id),
  );
  const blogCategoriesPromise = getAllBlogCategoriesActionPrivate();
  const availableSortOrdersPromise = currentBlogCategoryPromise.then((res) =>
    getAvailableSortOrdersActionPrivate(res.data?.parent?.id || ''),
  );

  return (
    <Suspense>
      <AdminBlogCategoryDetailPageContent
        currentBlogCategoryPromise={currentBlogCategoryPromise}
        blogCategoriesPromise={blogCategoriesPromise}
        availableSortOrdersPromise={availableSortOrdersPromise}
      />
    </Suspense>
  );
}
