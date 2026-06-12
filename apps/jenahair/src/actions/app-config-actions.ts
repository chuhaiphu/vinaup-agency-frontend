'use server';

import { updateTag, cacheLife, cacheTag } from 'next/cache';

import { executeApi } from '@/actions/_base';
import { getAppConfigApiPublic, updateAppConfigApiPrivate } from '@/apis/app-config-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { AppConfigResponse, UpdateAppConfigRequest } from '@/interfaces/app-config-interfaces';

export async function getAppConfigActionPublic(): Promise<ActionResponse<AppConfigResponse>> {
  'use cache';
  cacheLife('default');
  cacheTag('app-config');
  return executeApi(async () => getAppConfigApiPublic());
}

export async function updateAppConfigActionPrivate(
  input: UpdateAppConfigRequest,
): Promise<ActionResponse<AppConfigResponse>> {
  const result = await executeApi(async () => updateAppConfigApiPrivate(input));
  if (result.success) {
    updateTag('app-config');
  }
  return result;
}
