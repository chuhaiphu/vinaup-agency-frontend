export interface CreateDiaryCategoryRequest {
  title: string;
  endpoint: string;
}

export interface UpdateDiaryCategoryRequest extends Partial<CreateDiaryCategoryRequest> {
  title?: string;
  description?: string;
  parentId?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  videoPosition?: string;
  mainImageUrl?: string;
  endpoint?: string;
  sortOrder?: number;
}

export interface DiaryCategoryResponse {
  id: string;
  title: string;
  description: string | null;
  parent?: DiaryCategoryResponse | null;
  children?: DiaryCategoryResponse[];
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string;
  mainImageUrl: string | null;
  endpoint: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
