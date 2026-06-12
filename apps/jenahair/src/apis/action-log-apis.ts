import { generateFilterQueryString } from '@vinaup/utils';

import { ActionLog } from '@/interfaces/action-log-interfaces';

import { apiPrivate } from './_base';

export interface ActionLogFilterParams {
  entityType?: string;
  userId?: string;
}

export async function getAllActionLogsApiPrivate(filter?: ActionLogFilterParams) {
  const queryString = generateFilterQueryString({
    entityType: filter?.entityType,
    userId: filter?.userId,
  });
  return apiPrivate<ActionLog[]>(`/action-logs/admin${queryString}`, {
    method: 'GET',
  });
}

export async function getActionLogsByEntityApiPrivate(entityType: string, entityId: string) {
  return apiPrivate<ActionLog[]>(`/action-logs/admin/${entityType}/${entityId}`, {
    method: 'GET',
  });
}
