'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  createBlogApiPrivate,
  getBlogByIdApiPrivate,
  getBlogByEndpointApiPublic,
  getAllBlogsAdminApiPrivate,
  getAllBlogsApiPublic,
  updateBlogApiPrivate,
  deleteBlogApiPrivate,
  incrementBlogViewApiPublic,
  toggleBlogLikeApiPublic,
} from '@/apis/blog-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { CreateBlogRequest, BlogResponse, UpdateBlogRequest } from '@/interfaces/blog-interfaces';

export async function createBlogActionPrivate(
  input: CreateBlogRequest,
): Promise<ActionResponse<BlogResponse>> {
  const result = await executeApi(async () => createBlogApiPrivate(input));
  if (result.success) {
    updateTag('blogs');
  }
  return result;
}

export async function getBlogByIdActionPrivate(id: string): Promise<ActionResponse<BlogResponse>> {
  return executeApi(async () => getBlogByIdApiPrivate(id));
}

export async function getBlogByEndpointActionPublic(
  endpoint: string,
): Promise<ActionResponse<BlogResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('blogs', `blog:${endpoint}`);
  return executeApi(async () => getBlogByEndpointApiPublic(endpoint));
}

export async function getAllBlogsActionPrivate(): Promise<ActionResponse<BlogResponse[]>> {
  return executeApi(async () => getAllBlogsAdminApiPrivate());
}

export async function getAllBlogsActionPublic(): Promise<ActionResponse<BlogResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('blogs');
  return executeApi(async () => getAllBlogsApiPublic({ visibility: 'public' }));
}

export async function updateBlogActionPrivate(
  id: string,
  input: UpdateBlogRequest,
): Promise<ActionResponse<BlogResponse>> {
  const result = await executeApi(async () => updateBlogApiPrivate(id, input));
  if (result.success) {
    updateTag('blogs');
    if (input.endpoint) {
      updateTag(`blog:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteBlogActionPrivate(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteBlogApiPrivate(id));
  if (result.success) {
    updateTag('blogs');
  }
  return result;
}

// View/like counters fire on (almost) every visit. 
// They must NOT call updateTag('blogs'),
// doing so would invalidate the blog list cache on every read and defeat caching entirely.
export async function incrementBlogViewActionPublic(
  blogId: string,
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => incrementBlogViewApiPublic(blogId));
  return {
    success: result.success,
    data: result.data?.recorded ?? false,
    error: result.error,
  };
}

export async function incrementBlogLikeActionPublic(
  blogId: string,
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => toggleBlogLikeApiPublic(blogId));
  return {
    success: result.success,
    data: result.data?.liked ?? false,
    error: result.error,
  };
}
