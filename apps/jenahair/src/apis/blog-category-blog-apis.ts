import {
  CreateBlogCategoryBlogRequest,
  BlogCategoryBlogResponse,
  UpdateBlogCategoryBlogRequest,
} from '@/interfaces/blog-category-blog-interfaces';

import { apiPrivate, apiPublic } from './_base';

// Public GET (no auth)
export async function getAllBlogCategoryBlogsApiPublic() {
  return apiPublic<BlogCategoryBlogResponse[]>('/blog-category-blogs', {
    method: 'GET',
  });
}

export async function getBlogCategoryBlogByIdApiPublic(id: string) {
  return apiPublic<BlogCategoryBlogResponse>(`/blog-category-blogs/${id}`, {
    method: 'GET',
  });
}

export async function getBlogCategoryBlogsByBlogIdApiPublic(blogId: string) {
  return apiPublic<BlogCategoryBlogResponse[]>(`/blog-category-blogs/blog/${blogId}`, {
    method: 'GET',
  });
}

export async function getBlogCategoryBlogsByBlogCategoryIdApiPublic(blogCategoryId: string) {
  return apiPublic<BlogCategoryBlogResponse[]>(`/blog-category-blogs/category/${blogCategoryId}`, {
    method: 'GET',
  });
}

// Admin (auth)
export async function createBlogCategoryBlogApiPrivate(data: CreateBlogCategoryBlogRequest) {
  return apiPrivate<BlogCategoryBlogResponse>('/blog-category-blogs/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateBlogCategoryBlogApiPrivate(
  id: string,
  data: UpdateBlogCategoryBlogRequest,
) {
  return apiPrivate<BlogCategoryBlogResponse>(`/blog-category-blogs/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogCategoryBlogApiPrivate(id: string) {
  return apiPrivate<void>(`/blog-category-blogs/admin/${id}`, { method: 'DELETE' });
}

export async function deleteBlogCategoryBlogsByBlogIdApiPrivate(blogId: string) {
  return apiPrivate<void>(`/blog-category-blogs/admin/blog/${blogId}`, {
    method: 'DELETE',
  });
}

export async function deleteBlogCategoryBlogsByBlogCategoryIdApiPrivate(blogCategoryId: string) {
  return apiPrivate<void>(`/blog-category-blogs/admin/category/${blogCategoryId}`, {
    method: 'DELETE',
  });
}
