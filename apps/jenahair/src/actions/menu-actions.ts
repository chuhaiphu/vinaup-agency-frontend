'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  createMenuApiPrivate,
  getMenuByIdApiPrivate,
  getAllMenusAdminApiPrivate,
  getAvailableSortOrdersApiPrivate,
  updateMenuApiPrivate,
  deleteMenuApiPrivate,
  getAllMenusApiPublic,
} from '@/apis/menu-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { CreateMenuRequest, MenuResponse, UpdateMenuRequest } from '@/interfaces/menu-interfaces';

export async function createMenuActionPrivate(
  input: CreateMenuRequest,
): Promise<ActionResponse<MenuResponse>> {
  const result = await executeApi(async () => createMenuApiPrivate(input));
  if (result.success) {
    updateTag('menu');
  }
  return result;
}

export async function getMenuByIdActionPrivate(id: string): Promise<ActionResponse<MenuResponse>> {
  return executeApi(async () => getMenuByIdApiPrivate(id));
}

export async function getAllMenusActionPrivate(): Promise<ActionResponse<MenuResponse[]>> {
  return executeApi(async () => getAllMenusAdminApiPrivate());
}

export async function getAllMenusActionPublic(): Promise<ActionResponse<MenuResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('menu');
  return executeApi(async () => getAllMenusApiPublic());
}

export async function getAvailableSortOrdersActionPrivate(
  parentId: string,
): Promise<ActionResponse<number[]>> {
  return executeApi(async () => getAvailableSortOrdersApiPrivate(parentId));
}

export async function updateMenuActionPrivate(
  id: string,
  input: UpdateMenuRequest,
): Promise<ActionResponse<MenuResponse>> {
  const result = await executeApi(async () => updateMenuApiPrivate(id, input));
  if (result.success) {
    updateTag('menu');
  }
  return result;
}

export async function deleteMenuActionPrivate(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteMenuApiPrivate(id));
  if (result.success) {
    updateTag('menu');
  }
  return result;
}
