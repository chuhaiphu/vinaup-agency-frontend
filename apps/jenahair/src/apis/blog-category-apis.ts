import {
  CreateBlogCategoryRequest,
  BlogCategoryResponse,
  UpdateBlogCategoryRequest,
} from '@/interfaces/blog-category-interfaces';

import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function getAllBlogCategoriesApiPublic() {
  return apiPublic<BlogCategoryResponse[]>('/blog-categories', {
    method: 'GET',
  });
}

export async function getBlogCategoryByEndpointApiPublic(endpoint: string) {
  return apiPublic<BlogCategoryResponse>(`/blog-categories/${endpoint}`, {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createBlogCategoryApiPrivate(data: CreateBlogCategoryRequest) {
  return apiPrivate<BlogCategoryResponse>('/blog-categories/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllBlogCategoriesAdminApiPrivate() {
  return apiPrivate<BlogCategoryResponse[]>('/blog-categories/admin', {
    method: 'GET',
  });
}

export async function getAvailableSortOrdersApiPrivate(parentId: string) {
  return apiPrivate<number[]>(`/blog-categories/admin/available-sort-orders/${parentId}`, {
    method: 'GET',
  });
}

export async function getBlogCategoryByIdApiPrivate(id: string) {
  return apiPrivate<BlogCategoryResponse>(`/blog-categories/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateBlogCategoryApiPrivate(id: string, data: UpdateBlogCategoryRequest) {
  return apiPrivate<BlogCategoryResponse>(`/blog-categories/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogCategoryApiPrivate(id: string) {
  return apiPrivate<void>(`/blog-categories/admin/${id}`, {
    method: 'DELETE',
  });
}
