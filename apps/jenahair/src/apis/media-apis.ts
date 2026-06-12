import { generateFilterQueryString } from '@vinaup/utils';

import {
  CreateMediaRequest,
  MediaResponse,
  UpdateMediaRequest,
} from '@/interfaces/media-interfaces';

import { apiPrivate } from './_base';

export async function createMediaApiPrivate(data: CreateMediaRequest) {
  return apiPrivate<MediaResponse>('/media/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllMediaApiPrivate(folder?: string) {
  const queryString = generateFilterQueryString({ folder });
  return apiPrivate<MediaResponse[]>(`/media/admin${queryString}`, {
    method: 'GET',
  });
}

export async function getMediaFoldersApiPrivate() {
  return apiPrivate<string[]>('/media/admin/folders', {
    method: 'GET',
  });
}

export async function getMediaByIdApiPrivate(id: string) {
  return apiPrivate<MediaResponse>(`/media/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateMediaApiPrivate(id: string, data: UpdateMediaRequest) {
  return apiPrivate<MediaResponse>(`/media/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteMediaApiPrivate(id: string) {
  return apiPrivate<void>(`/media/admin/${id}`, {
    method: 'DELETE',
  });
}
