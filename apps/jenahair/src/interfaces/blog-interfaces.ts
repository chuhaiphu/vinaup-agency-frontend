import { BlogCategoryBlogResponse } from './blog-category-blog-interfaces';
import { UserResponse } from './user-interfaces';

export interface CreateBlogRequest {
  title: string;
  destinations: string[];
  endpoint: string;
  userId: string;
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {
  endpoint?: string;
  country?: string;
  description?: string;
  content?: string;
  visibility?: string;
  sortOrder?: number;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  videoPosition?: string;
  mainImageUrl?: string;
  additionalImageUrls?: string[];
  additionalImagesPosition?: string;
  categoryId?: string;
}

export interface BlogResponse {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  country: string;
  destinations: string[];
  endpoint: string;
  visibility: string;
  sortOrder: number;
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string | null;
  mainImageUrl: string | null;
  additionalImageUrls: string[];
  additionalImagesPosition: string | null;
  likes: number;
  views: number;
  createdBy: UserResponse | null;
  createdAt: Date;
  updatedAt: Date;
  blogCategoryBlogs: BlogCategoryBlogResponse[];
}
