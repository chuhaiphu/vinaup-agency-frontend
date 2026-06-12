'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  createDiaryApiPrivate,
  getDiaryByIdApiPrivate,
  getDiaryByEndpointApiPublic,
  getAllDiariesAdminApiPrivate,
  getAllDiariesApiPublic,
  updateDiaryApiPrivate,
  deleteDiaryApiPrivate,
  incrementDiaryViewApiPublic,
  toggleDiaryLikeApiPublic,
} from '@/apis/diary-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import {
  CreateDiaryRequest,
  DiaryResponse,
  UpdateDiaryRequest,
} from '@/interfaces/diary-interfaces';

export async function createDiaryActionPrivate(
  input: CreateDiaryRequest,
): Promise<ActionResponse<DiaryResponse>> {
  const result = await executeApi(async () => createDiaryApiPrivate(input));
  if (result.success) {
    updateTag('diaries');
  }
  return result;
}

export async function getDiaryByIdActionPrivate(
  id: string,
): Promise<ActionResponse<DiaryResponse>> {
  return executeApi(async () => getDiaryByIdApiPrivate(id));
}

export async function getDiaryByEndpointActionPublic(
  endpoint: string,
): Promise<ActionResponse<DiaryResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('diaries', `diary:${endpoint}`);
  return executeApi(async () => getDiaryByEndpointApiPublic(endpoint));
}

export async function getAllDiariesActionPrivate(): Promise<ActionResponse<DiaryResponse[]>> {
  return executeApi(async () => getAllDiariesAdminApiPrivate());
}

export async function getAllDiariesActionPublic(): Promise<ActionResponse<DiaryResponse[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('diaries');
  return executeApi(async () => getAllDiariesApiPublic({ visibility: 'public' }));
}

export async function updateDiaryActionPrivate(
  id: string,
  input: UpdateDiaryRequest,
): Promise<ActionResponse<DiaryResponse>> {
  const result = await executeApi(async () => updateDiaryApiPrivate(id, input));
  if (result.success) {
    updateTag('diaries');
    if (input.endpoint) {
      updateTag(`diary:${input.endpoint}`);
    }
  }
  return result;
}

export async function deleteDiaryActionPrivate(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteDiaryApiPrivate(id));
  if (result.success) {
    updateTag('diaries');
  }
  return result;
}

export async function incrementDiaryViewActionPublic(
  diaryId: string,
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => incrementDiaryViewApiPublic(diaryId));
  if (result.success) {
    updateTag('diaries');
  }
  return {
    success: result.success,
    data: result.data?.recorded ?? false,
    error: result.error,
  };
}

export async function incrementDiaryLikeActionPublic(
  diaryId: string,
): Promise<ActionResponse<boolean>> {
  const result = await executeApi(async () => toggleDiaryLikeApiPublic(diaryId));
  if (result.success) {
    updateTag('diaries');
  }
  return {
    success: result.success,
    data: result.data?.liked ?? false,
    error: result.error,
  };
}
