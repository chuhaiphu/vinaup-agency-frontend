import { BlogCategoryResponse } from '@/interfaces/blog-category-interfaces';

export interface BlogCategoryDetailFormValues {
  title: string;
  description: string;
  parentId: string | null;
  sortOrder: number;
  videoUrl: string;
  videoThumbnailUrl: string;
  videoPosition: string;
  mainImageUrl: string;
}

export function toBlogCategoryDetailFormValues(
  blogCategory: BlogCategoryResponse,
): BlogCategoryDetailFormValues {
  return {
    title: blogCategory.title,
    description: blogCategory.description || '',
    parentId: blogCategory.parent?.id || null,
    sortOrder: blogCategory.sortOrder || 0,
    videoUrl: blogCategory.videoUrl || '',
    videoThumbnailUrl: blogCategory.videoThumbnailUrl || '',
    videoPosition: blogCategory.videoPosition || 'end',
    mainImageUrl: blogCategory.mainImageUrl || '',
  };
}
