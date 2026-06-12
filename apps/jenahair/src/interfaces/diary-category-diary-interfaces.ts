import { DiaryCategoryResponse } from './diary-category-interfaces';
import { DiaryResponse } from './diary-interfaces';

export interface CreateDiaryCategoryDiaryRequest {
  diaryCategoryId: string;
  diaryId: string;
  sortOrder?: number;
}

export interface UpdateDiaryCategoryDiaryRequest {
  sortOrder?: number;
}

export interface DiaryCategoryDiaryResponse {
  id: string;
  diaryCategoryId: string;
  diaryId: string;
  sortOrder: number;
  diaryCategory?: DiaryCategoryResponse;
  diary?: DiaryResponse;
}
