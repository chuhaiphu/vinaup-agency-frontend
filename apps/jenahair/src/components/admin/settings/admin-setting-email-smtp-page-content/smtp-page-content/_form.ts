import { SmtpConfigResponse } from '@/interfaces/smtp-config-interfaces';

export interface SmtpFormValues {
  host: string;
  port: number | string;
  username: string;
  password: string;
  secure: boolean;
  fromName: string;
  fromEmail: string;
  receiveEmail: string;
}

export function toSmtpFormValues(config: SmtpConfigResponse | null): SmtpFormValues {
  return {
    host: config?.host || '',
    port: config?.port || 587,
    // Password is write-only: never hydrated from the server; blank means "keep current".
    password: '',
    username: config?.username || '',
    secure: config?.secure || false,
    fromName: config?.fromName || '',
    fromEmail: config?.fromEmail || '',
    receiveEmail: config?.receiveEmail || '',
  };
}
