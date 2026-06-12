'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  createSectionUICredentialsApiPrivate,
  getAllSectionUICredentialsApiPrivate,
  getSectionUICredentialsByCodeApiPrivate,
  getSectionUICredentialsByIdApiPrivate,
  updateSectionUICredentialsApiPrivate,
  deleteSectionUICredentialsApiPrivate,
  createSectionUIApiPrivate,
  getAllSectionUIsApiPublic,
  getUsedSectionUIPositionsApiPublic,
  getSectionUIByPositionApiPublic,
  getSectionUIByIdApiPublic,
  updateSectionUIApiPrivate,
  deleteSectionUIApiPrivate,
} from '@/apis/section-ui-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
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

// ==================== SECTION UI CREDENTIALS ACTIONS ====================

export async function createSectionUICredentialsActionPrivate(
  input: CreateSectionUICredentialsRequest,
): Promise<ActionResponse<SectionUICredentialsResponse>> {
  const result = await executeApi(async () => createSectionUICredentialsApiPrivate(input));
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

export async function getAllSectionUICredentialsActionPrivate(): Promise<
  ActionResponse<SectionUICredentialsResponse[]>
> {
  return executeApi(async () => getAllSectionUICredentialsApiPrivate());
}

export async function getSectionUICredentialsByCodeActionPrivate(
  code: string,
): Promise<ActionResponse<SectionUICredentialsResponse>> {
  return executeApi(async () => getSectionUICredentialsByCodeApiPrivate(code));
}

export async function getSectionUICredentialsByIdActionPrivate(
  id: string,
): Promise<ActionResponse<SectionUICredentialsResponse>> {
  return executeApi(async () => getSectionUICredentialsByIdApiPrivate(id));
}

export async function updateSectionUICredentialsActionPrivate(
  id: string,
  input: UpdateSectionUICredentialsRequest,
): Promise<ActionResponse<SectionUICredentialsResponse>> {
  const result = await executeApi(async () => updateSectionUICredentialsApiPrivate(id, input));
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

export async function deleteSectionUICredentialsActionPrivate(
  id: string,
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteSectionUICredentialsApiPrivate(id));
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

// ==================== DYNAMIC SECTION UI ACTIONS ====================

export async function createSectionUIActionPrivate(
  input: CreateDynamicSectionUIRequest,
): Promise<ActionResponse<DynamicSectionUIResponse>> {
  const result = await executeApi(async () => createSectionUIApiPrivate(input));
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

export async function getAllSectionUIsActionPublic(): Promise<
  ActionResponse<DynamicSectionUIResponse[]>
> {
  'use cache';
  cacheLife('default');
  cacheTag('section-ui');
  return executeApi(async () => getAllSectionUIsApiPublic());
}

export async function getUsedSectionUIPositionsActionPublic(): Promise<ActionResponse<number[]>> {
  'use cache';
  cacheLife('default');
  cacheTag('section-ui');
  return executeApi(async () => getUsedSectionUIPositionsApiPublic());
}

export async function getSectionUIByPositionActionPublic(
  position: number,
): Promise<ActionResponse<DynamicSectionUIResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('section-ui');
  return executeApi(async () => getSectionUIByPositionApiPublic(position));
}

export async function getSectionUIByIdActionPublic(
  id: string,
): Promise<ActionResponse<DynamicSectionUIResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('section-ui');
  return executeApi(async () => getSectionUIByIdApiPublic(id));
}

export async function updateSectionUIActionPrivate(
  id: string,
  input: UpdateDynamicSectionUIRequest,
): Promise<ActionResponse<DynamicSectionUIResponse>> {
  const result = await executeApi(async () => updateSectionUIApiPrivate(id, input));
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}

export async function deleteSectionUIActionPrivate(id: string): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteSectionUIApiPrivate(id));
  if (result.success) {
    updateTag('section-ui');
  }
  return result;
}
