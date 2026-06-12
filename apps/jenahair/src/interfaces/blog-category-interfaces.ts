export interface CreateBlogCategoryRequest {
  title: string;
  endpoint: string;
}

export interface UpdateBlogCategoryRequest extends Partial<CreateBlogCategoryRequest> {
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

export interface BlogCategoryResponse {
  id: string;
  title: string;
  description: string | null;
  parent?: BlogCategoryResponse | null;
  children?: BlogCategoryResponse[];
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string;
  mainImageUrl: string | null;
  endpoint: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}
