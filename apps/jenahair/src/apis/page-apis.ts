import { CreatePageRequest, PageResponse, UpdatePageRequest } from '@/interfaces/page-interfaces';

import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function getAllPagesApiPublic() {
  return apiPublic<PageResponse[]>('/pages', {
    method: 'GET',
  });
}

export async function getPageByEndpointApiPublic(endpoint: string) {
  return apiPublic<PageResponse>(`/pages/${endpoint}`, {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function createPageApiPrivate(data: CreatePageRequest) {
  return apiPrivate<PageResponse>('/pages/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllPagesAdminApiPrivate() {
  return apiPrivate<PageResponse[]>('/pages/admin', {
    method: 'GET',
  });
}

export async function getPageByIdApiPrivate(id: string) {
  return apiPrivate<PageResponse>(`/pages/admin/${id}`, {
    method: 'GET',
  });
}

export async function updatePageApiPrivate(id: string, data: UpdatePageRequest) {
  return apiPrivate<PageResponse>(`/pages/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deletePageApiPrivate(id: string) {
  return apiPrivate<void>(`/pages/admin/${id}`, {
    method: 'DELETE',
  });
}
