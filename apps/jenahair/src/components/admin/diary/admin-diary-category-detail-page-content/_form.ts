import { DiaryCategoryResponse } from '@/interfaces/diary-category-interfaces';

export interface DiaryCategoryDetailFormValues {
  title: string;
  description: string;
  parentId: string | null;
  sortOrder: number;
  videoUrl: string;
  videoThumbnailUrl: string;
  videoPosition: string;
  mainImageUrl: string;
}

export function toDiaryCategoryDetailFormValues(
  diaryCategory: DiaryCategoryResponse,
): DiaryCategoryDetailFormValues {
  return {
    title: diaryCategory.title,
    description: diaryCategory.description || '',
    parentId: diaryCategory.parent?.id || null,
    sortOrder: diaryCategory.sortOrder || 0,
    videoUrl: diaryCategory.videoUrl || '',
    videoThumbnailUrl: diaryCategory.videoThumbnailUrl || '',
    videoPosition: diaryCategory.videoPosition || 'end',
    mainImageUrl: diaryCategory.mainImageUrl || '',
  };
}
