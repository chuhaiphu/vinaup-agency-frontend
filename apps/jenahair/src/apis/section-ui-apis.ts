import {
  CreateDynamicSectionUIRequest,
  DynamicSectionUIResponse,
  UpdateDynamicSectionUIRequest,
} from '@/interfaces/dynamic-section-ui-interfaces';
import {
  CreateSectionUICredentialsRequest,
  SectionUICredentialsResponse,
  UpdateSectionUICredentialsRequest,
} from '@/interfaces/section-ui-credentials-interfaces';

import { apiPrivate, apiPublic } from './_base';

// ==================== SECTION UI CREDENTIALS ROUTES ====================

export async function createSectionUICredentialsApiPrivate(
  data: CreateSectionUICredentialsRequest,
) {
  return apiPrivate<SectionUICredentialsResponse>('/section-ui/admin/credentials', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllSectionUICredentialsApiPrivate() {
  return apiPrivate<SectionUICredentialsResponse[]>('/section-ui/admin/credentials', {
    method: 'GET',
  });
}

export async function getSectionUICredentialsByCodeApiPrivate(code: string) {
  return apiPrivate<SectionUICredentialsResponse>(`/section-ui/admin/credentials/code/${code}`, {
    method: 'GET',
  });
}

export async function getSectionUICredentialsByIdApiPrivate(id: string) {
  return apiPrivate<SectionUICredentialsResponse>(`/section-ui/admin/credentials/${id}`, {
    method: 'GET',
  });
}

export async function updateSectionUICredentialsApiPrivate(
  id: string,
  data: UpdateSectionUICredentialsRequest,
) {
  return apiPrivate<SectionUICredentialsResponse>(`/section-ui/admin/credentials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSectionUICredentialsApiPrivate(id: string) {
  return apiPrivate<void>(`/section-ui/admin/credentials/${id}`, {
    method: 'DELETE',
  });
}

// ==================== DYNAMIC SECTION UI ROUTES ====================
// Public GETs: /section-ui/sections; Admin mutate: /section-ui/admin/sections

export async function createSectionUIApiPrivate(data: CreateDynamicSectionUIRequest) {
  return apiPrivate<DynamicSectionUIResponse>('/section-ui/admin/sections', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllSectionUIsApiPublic() {
  return apiPublic<DynamicSectionUIResponse[]>('/section-ui/sections', {
    method: 'GET',
  });
}

export async function getUsedSectionUIPositionsApiPublic() {
  return apiPublic<number[]>('/section-ui/sections/positions/used', {
    method: 'GET',
  });
}

export async function getSectionUIByPositionApiPublic(position: number) {
  return apiPublic<DynamicSectionUIResponse>(`/section-ui/sections/position/${position}`, {
    method: 'GET',
  });
}

export async function getSectionUIByIdApiPublic(id: string) {
  return apiPublic<DynamicSectionUIResponse>(`/section-ui/sections/${id}`, {
    method: 'GET',
  });
}

export async function updateSectionUIApiPrivate(id: string, data: UpdateDynamicSectionUIRequest) {
  return apiPrivate<DynamicSectionUIResponse>(`/section-ui/admin/sections/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteSectionUIApiPrivate(id: string) {
  return apiPrivate<void>(`/section-ui/admin/sections/${id}`, {
    method: 'DELETE',
  });
}
