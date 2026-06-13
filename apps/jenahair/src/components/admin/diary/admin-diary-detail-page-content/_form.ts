import { DiaryResponse } from '@/interfaces/diary-interfaces';

export interface DiaryDetailFormValues {
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

export function toDiaryDetailFormValues(diary: DiaryResponse): DiaryDetailFormValues {
  return {
    title: diary.title,
    content: diary.content || '',
    destinations: diary.destinations,
    visibility: diary.visibility,
    sortOrder: diary.sortOrder,
    categoryIds: diary.diaryCategoryDiaries.map((dcd) => dcd.diaryCategoryId),
    mainImageUrl: diary.mainImageUrl || '',
    additionalImageUrls: diary.additionalImageUrls,
    additionalImagesPosition: diary.additionalImagesPosition || 'top',
    videoUrl: diary.videoUrl || '',
    videoThumbnailUrl: diary.videoThumbnailUrl || '',
    videoPosition: diary.videoPosition || 'bottom',
  };
}
