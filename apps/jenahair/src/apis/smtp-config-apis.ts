import { SmtpConfigResponse, UpdateSmtpConfigRequest } from '@/interfaces/smtp-config-interfaces';

import { apiPrivate } from './_base';

export async function getSmtpConfigApiPrivate() {
  return apiPrivate<SmtpConfigResponse>('/smtp-config/admin', {
    method: 'GET',
  });
}

export async function updateSmtpConfigApiPrivate(data: UpdateSmtpConfigRequest) {
  return apiPrivate<SmtpConfigResponse>('/smtp-config/admin', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function testSmtpEmailApiPrivate(email: string) {
  return apiPrivate<{ success: boolean }>('/smtp-config/admin/test', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}
