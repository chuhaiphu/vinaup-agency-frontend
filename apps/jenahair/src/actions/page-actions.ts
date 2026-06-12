'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  createPageApiPrivate,
  getPageByIdApiPrivate,
  getPageByEndpointApiPublic,
  getAllPagesApiPublic,
  getAllPagesAdminApiPrivate,
  updatePageApiPrivate,
  deletePageApiPrivate,
} from '@/apis/page-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { CreatePageRequest, PageResponse, UpdatePageRequest } from '@/interfaces/page-interfaces';

export async function createPageActionPrivate(
  input: CreatePageRequest,
): Promise<ActionResponse<PageResponse>> {
  const result = await executeApi(async () => createPageApiPrivate(input));
  if (result.success) {
    updateTag('pages');
  }
  return result;
}

export async function getPageByIdActionPrivate(id: string): Promise<ActionResponse<PageResponse>> {
  return executeApi(async () => getPageByIdApiPrivate(id));
}

export async function getPageByEndpointActionPublic(
  endpoint: string,
): Promise<ActionResponse<PageResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('pages', `page:${endpoint}`);
  return executeApi(async () => getPageByEndpointApiPublic(endpoint));
}

export async function getAllPagesAdminActionPrivate(): Promise<ActionResponse<PageResponse[]>> {
  return executeApi(async () => getAllPagesAdminApiPrivate());
}

export async function getAllPagesPublicActionPublic(): Promise<ActionResponse<PageResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('pages');
  return executeApi(async () => getAllPagesApiPublic());
}

export async function getAllPagesVisibleActionPrivate(): Promise<ActionResponse<PageResponse[]>> {
  // Note: This may need a backend filter endpoint
  const result = await executeApi(async () => getAllPagesAdminApiPrivate());
  if (result.success && result.data) {
    return {
      success: true,
      data: result.data.filter((page) => page.visibility === 'PUBLIC'),
    };
  }
  return result;
}

export async function updatePageActionPrivate(
  id: string,
  input: UpdatePageRequest,
): Promise<ActionResponse<PageResponse>> {
  const result = await executeApi(async () => updatePageApiPrivate(id, input));
  if (result.success) {
    updateTag('pages');
    if (input.endpoint) {
      updateTag(`page:${input.endpoint}`);
    }
  }
  return result;
}

export async function deletePageActionPrivate(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deletePageApiPrivate(id));
  if (result.success) {
    updateTag('pages');
  }
  return result;
}
