import { BlogResponse } from "./blog-interfaces";
import { BlogCategoryResponse } from "./blog-category-interfaces";

export interface CreateBlogCategoryBlog {
  blogCategoryId: string;
  blogId: string;
  sortOrder?: number;
}

export interface UpdateBlogCategoryBlog {
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

