import { BlogCategoryResponse } from './blog-category-interfaces';
import { BlogResponse } from './blog-interfaces';

export interface CreateBlogCategoryBlogRequest {
  blogCategoryId: string;
  blogId: string;
  sortOrder?: number;
}

export interface UpdateBlogCategoryBlogRequest {
  sortOrder?: number;
}

export interface BlogCategoryBlogResponse {
  id: string;
  blogCategoryId: string;
  blogId: string;
  sortOrder: number;
  blogCategory?: BlogCategoryResponse;
  blog?: BlogResponse;
}
