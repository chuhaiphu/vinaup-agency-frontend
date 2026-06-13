import { PageResponse } from '@/interfaces/page-interfaces';

export interface PageDetailFormValues {
  title: string;
  endpoint: string;
  content: string;
  visibility: string;
  type: string;
  mainImageUrl: string;
  additionalImageUrls: string[];
  additionalImagesPosition: string;
  videoUrl: string;
  videoThumbnailUrl: string;
  videoPosition: string;
}

export function toPageDetailFormValues(page: PageResponse): PageDetailFormValues {
  return {
    title: page.title,
    endpoint: page.endpoint,
    content: page.content || '',
    visibility: page.visibility,
    type: page.type,
    mainImageUrl: page.mainImageUrl || '',
    additionalImageUrls: page.additionalImageUrls,
    additionalImagesPosition: page.additionalImagesPosition || 'top',
    videoUrl: page.videoUrl || '',
    videoThumbnailUrl: page.videoThumbnailUrl || '',
    videoPosition: page.videoPosition || 'bottom',
  };
}
