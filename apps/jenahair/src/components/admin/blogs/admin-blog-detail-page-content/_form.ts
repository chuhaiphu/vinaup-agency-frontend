import { BlogResponse } from '@/interfaces/blog-interfaces';

export interface BlogDetailFormValues {
  title: string;
  content: string;
  destinations: string[];
  visibility: string;
  sortOrder: number;
  categoryIds: string[];
  mainImageUrl: string;
  additionalImageUrls: string[];
  additionalImagesPosition: string;
  videoUrl: string;
  videoThumbnailUrl: string;
  videoPosition: string;
}

export function toBlogDetailFormValues(blog: BlogResponse): BlogDetailFormValues {
  return {
    title: blog.title,
    content: blog.content || '',
    destinations: blog.destinations,
    visibility: blog.visibility,
    sortOrder: blog.sortOrder,
    categoryIds: blog.blogCategoryBlogs.map((bcb) => bcb.blogCategoryId),
    mainImageUrl: blog.mainImageUrl || '',
    additionalImageUrls: blog.additionalImageUrls,
    additionalImagesPosition: blog.additionalImagesPosition || 'top',
    videoUrl: blog.videoUrl || '',
    videoThumbnailUrl: blog.videoThumbnailUrl || '',
    videoPosition: blog.videoPosition || 'bottom',
  };
}
