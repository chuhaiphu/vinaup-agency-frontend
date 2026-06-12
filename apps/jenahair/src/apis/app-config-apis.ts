import { AppConfigResponse, UpdateAppConfigRequest } from '@/interfaces/app-config-interfaces';

import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function getAppConfigApiPublic() {
  return apiPublic<AppConfigResponse>('/app-config', {
    method: 'GET',
  });
}

// ==================== ADMIN ROUTES ====================

export async function getAppConfigAdminApiPrivate() {
  return apiPrivate<AppConfigResponse>('/app-config/admin', {
    method: 'GET',
  });
}

export async function updateAppConfigApiPrivate(data: UpdateAppConfigRequest) {
  return apiPrivate<AppConfigResponse>('/app-config/admin', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
