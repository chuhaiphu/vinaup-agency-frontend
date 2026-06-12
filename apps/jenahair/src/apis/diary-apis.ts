import { generateFilterQueryString } from '@vinaup/utils';

import {
  CreateDiaryRequest,
  DiaryResponse,
  UpdateDiaryRequest,
} from '@/interfaces/diary-interfaces';

import { apiPrivate, apiPublic } from './_base';

export interface DiaryFilterParams {
  visibility?: string;
}

// ==================== PUBLIC ROUTES ====================

export async function getAllDiariesApiPublic(filter?: DiaryFilterParams) {
  const queryString = generateFilterQueryString({ visibility: filter?.visibility });
  return apiPublic<DiaryResponse[]>(`/diaries${queryString}`, {
    method: 'GET',
  });
}

export async function getDiaryByEndpointApiPublic(endpoint: string) {
  return apiPublic<DiaryResponse>(`/diaries/${endpoint}`, {
    method: 'GET',
  });
}

export async function incrementDiaryViewApiPublic(id: string) {
  return apiPublic<{ recorded: boolean }>(`/diaries/${id}/view`, {
    method: 'POST',
  });
}

export async function toggleDiaryLikeApiPublic(id: string) {
  return apiPublic<{ liked: boolean }>(`/diaries/${id}/like`, {
    method: 'POST',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createDiaryApiPrivate(data: CreateDiaryRequest) {
  return apiPrivate<DiaryResponse>('/diaries/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllDiariesAdminApiPrivate(filter?: DiaryFilterParams) {
  const queryString = generateFilterQueryString({ visibility: filter?.visibility });
  return apiPrivate<DiaryResponse[]>(`/diaries/admin${queryString}`, {
    method: 'GET',
  });
}

export async function getDiaryByIdApiPrivate(id: string) {
  return apiPrivate<DiaryResponse>(`/diaries/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateDiaryApiPrivate(id: string, data: UpdateDiaryRequest) {
  return apiPrivate<DiaryResponse>(`/diaries/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteDiaryApiPrivate(id: string) {
  return apiPrivate<void>(`/diaries/admin/${id}`, {
    method: 'DELETE',
  });
}
