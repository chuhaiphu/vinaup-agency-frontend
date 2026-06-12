'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  createBlogCategoryApiPrivate,
  getBlogCategoryByIdApiPrivate,
  getBlogCategoryByEndpointApiPublic,
  getAllBlogCategoriesApiPublic,
  getAllBlogCategoriesAdminApiPrivate,
  getAvailableSortOrdersApiPrivate,
  updateBlogCategoryApiPrivate,
  deleteBlogCategoryApiPrivate,
} from '@/apis/blog-category-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import {
  CreateBlogCategoryRequest,
  BlogCategoryResponse,
  UpdateBlogCategoryRequest,
} from '@/interfaces/blog-category-interfaces';

export async function createBlogCategoryActionPrivate(
  input: CreateBlogCategoryRequest,
): Promise<ActionResponse<BlogCategoryResponse>> {
  const result = await executeApi(async () => createBlogCategoryApiPrivate(input));
  if (result.success) {
    updateTag('blog-categories');
  }
  return result;
}

export async function getBlogCategoryByIdActionPrivate(
  id: string,
): Promise<ActionResponse<BlogCategoryResponse>> {
  return executeApi(async () => getBlogCategoryByIdApiPrivate(id));
}

export async function getBlogCategoryByEndpointActionPublic(
  endpoint: string,
): Promise<ActionResponse<BlogCategoryResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('blog-categories', `blog-category:${endpoint}`);
  return executeApi(async () => getBlogCategoryByEndpointApiPublic(endpoint));
}

export async function getAllBlogCategoriesActionPrivate(): Promise<
  ActionResponse<BlogCategoryResponse[]>
> {
  return executeApi(async () => getAllBlogCategoriesAdminApiPrivate());
}

export async function getAllBlogCategoriesActionPublic(): Promise<
  ActionResponse<BlogCategoryResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('blog-categories');
  return executeApi(async () => getAllBlogCategoriesApiPublic());
}

export async function getAvailableSortOrdersActionPrivate(
  parentId: string,
): Promise<ActionResponse<number[]>> {
  return executeApi(async () => getAvailableSortOrdersApiPrivate(parentId));
}

export async function updateBlogCategoryActionPrivate(
  id: string,
  input: UpdateBlogCategoryRequest,
): Promise<ActionResponse<BlogCategoryResponse>> {
  const result = await executeApi(async () => updateBlogCategoryApiPrivate(id, input));
  if (result.success) {
    updateTag('blog-categories');
    if (input.endpoint) {
      updateTag(`blog-category:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteBlogCategoryActionPrivate(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteBlogCategoryApiPrivate(id));
  if (result.success) {
    updateTag('blog-categories');
  }
  return result;
}
