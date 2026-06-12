import {
  CreateDiaryCategoryRequest,
  DiaryCategoryResponse,
  UpdateDiaryCategoryRequest,
} from '@/interfaces/diary-category-interfaces';

import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function getAllDiaryCategoriesApiPublic() {
  return apiPublic<DiaryCategoryResponse[]>('/diary-categories', {
    method: 'GET',
  });
}

export async function getDiaryCategoryByEndpointApiPublic(endpoint: string) {
  return apiPublic<DiaryCategoryResponse>(`/diary-categories/${endpoint}`, {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createDiaryCategoryApiPrivate(data: CreateDiaryCategoryRequest) {
  return apiPrivate<DiaryCategoryResponse>('/diary-categories/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllDiaryCategoriesAdminApiPrivate() {
  return apiPrivate<DiaryCategoryResponse[]>('/diary-categories/admin', {
    method: 'GET',
  });
}

export async function getAvailableSortOrdersApiPrivate(parentId: string) {
  return apiPrivate<number[]>(`/diary-categories/admin/available-sort-orders/${parentId}`, {
    method: 'GET',
  });
}

export async function getDiaryCategoryByIdApiPrivate(id: string) {
  return apiPrivate<DiaryCategoryResponse>(`/diary-categories/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateDiaryCategoryApiPrivate(id: string, data: UpdateDiaryCategoryRequest) {
  return apiPrivate<DiaryCategoryResponse>(`/diary-categories/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteDiaryCategoryApiPrivate(id: string) {
  return apiPrivate<void>(`/diary-categories/admin/${id}`, {
    method: 'DELETE',
  });
}
