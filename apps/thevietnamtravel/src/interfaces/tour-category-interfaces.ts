export interface CreateTourCategory {
  title: string;
  endpoint: string;
}

export interface UpdateTourCategory extends Partial<CreateTourCategory> {
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

export interface TourCategoryResponse {
  id: string;
  title: string;
  description: string | null;
  parent?: TourCategoryResponse | null;
  children?: TourCategoryResponse[];
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string;
  mainImageUrl: string | null;
  endpoint: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
