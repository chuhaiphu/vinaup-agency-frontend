import { generateFilterQueryString } from '@vinaup/utils';

import { CreateBlogRequest, BlogResponse, UpdateBlogRequest } from '@/interfaces/blog-interfaces';

import { apiPrivate, apiPublic } from './_base';

export interface BlogFilterParams {
  visibility?: string;
}

// ==================== PUBLIC ROUTES ====================

export async function getAllBlogsApiPublic(filter?: BlogFilterParams) {
  const queryString = generateFilterQueryString({ visibility: filter?.visibility });
  return apiPublic<BlogResponse[]>(`/blogs${queryString}`, {
    method: 'GET',
  });
}

export async function getBlogByEndpointApiPublic(endpoint: string) {
  return apiPublic<BlogResponse>(`/blogs/${endpoint}`, {
    method: 'GET',
  });
}

export async function incrementBlogViewApiPublic(id: string) {
  return apiPublic<{ recorded: boolean }>(`/blogs/${id}/view`, {
    method: 'POST',
  });
}

export async function toggleBlogLikeApiPublic(id: string) {
  return apiPublic<{ liked: boolean }>(`/blogs/${id}/like`, {
    method: 'POST',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createBlogApiPrivate(data: CreateBlogRequest) {
  return apiPrivate<BlogResponse>('/blogs/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllBlogsAdminApiPrivate(filter?: BlogFilterParams) {
  const queryString = generateFilterQueryString({ visibility: filter?.visibility });
  return apiPrivate<BlogResponse[]>(`/blogs/admin${queryString}`, {
    method: 'GET',
  });
}

export async function getBlogByIdApiPrivate(id: string) {
  return apiPrivate<BlogResponse>(`/blogs/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateBlogApiPrivate(id: string, data: UpdateBlogRequest) {
  return apiPrivate<BlogResponse>(`/blogs/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteBlogApiPrivate(id: string) {
  return apiPrivate<void>(`/blogs/admin/${id}`, {
    method: 'DELETE',
  });
}
