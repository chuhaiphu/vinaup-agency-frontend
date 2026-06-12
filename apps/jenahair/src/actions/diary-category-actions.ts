'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  createDiaryCategoryApiPrivate,
  getDiaryCategoryByIdApiPrivate,
  getDiaryCategoryByEndpointApiPublic,
  getAllDiaryCategoriesApiPublic,
  getAllDiaryCategoriesAdminApiPrivate,
  getAvailableSortOrdersApiPrivate,
  updateDiaryCategoryApiPrivate,
  deleteDiaryCategoryApiPrivate,
} from '@/apis/diary-category-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import {
  CreateDiaryCategoryRequest,
  DiaryCategoryResponse,
  UpdateDiaryCategoryRequest,
} from '@/interfaces/diary-category-interfaces';

export async function createDiaryCategoryActionPrivate(
  input: CreateDiaryCategoryRequest,
): Promise<ActionResponse<DiaryCategoryResponse>> {
  const result = await executeApi(async () => createDiaryCategoryApiPrivate(input));
  if (result.success) {
    updateTag('diary-categories');
  }
  return result;
}

export async function getDiaryCategoryByIdActionPrivate(
  id: string,
): Promise<ActionResponse<DiaryCategoryResponse>> {
  return executeApi(async () => getDiaryCategoryByIdApiPrivate(id));
}

export async function getDiaryCategoryByEndpointActionPublic(
  endpoint: string,
): Promise<ActionResponse<DiaryCategoryResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('diary-categories', `diary-category:${endpoint}`);
  return executeApi(async () => getDiaryCategoryByEndpointApiPublic(endpoint));
}

export async function getAllDiaryCategoriesActionPrivate(): Promise<
  ActionResponse<DiaryCategoryResponse[]>
> {
  return executeApi(async () => getAllDiaryCategoriesAdminApiPrivate());
}

export async function getAllDiaryCategoriesActionPublic(): Promise<
  ActionResponse<DiaryCategoryResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('diary-categories');
  return executeApi(async () => getAllDiaryCategoriesApiPublic());
}

export async function getAvailableSortOrdersActionPrivate(
  parentId: string,
): Promise<ActionResponse<number[]>> {
  return executeApi(async () => getAvailableSortOrdersApiPrivate(parentId));
}

export async function updateDiaryCategoryActionPrivate(
  id: string,
  input: UpdateDiaryCategoryRequest,
): Promise<ActionResponse<DiaryCategoryResponse>> {
  const result = await executeApi(async () => updateDiaryCategoryApiPrivate(id, input));
  if (result.success) {
    updateTag('diary-categories');
    if (input.endpoint) {
      updateTag(`diary-category:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteDiaryCategoryActionPrivate(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteDiaryCategoryApiPrivate(id));
  if (result.success) {
    updateTag('diary-categories');
  }
  return result;
}
