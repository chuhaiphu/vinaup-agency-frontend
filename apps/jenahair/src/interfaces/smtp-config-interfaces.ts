export interface SmtpConfigResponse {
  id: string;
  host: string;
  port: number;
  secure: boolean;
  username: string;
  fromName: string;
  fromEmail: string;
  receiveEmail: string | null;
  updatedAt: Date;
}

export interface SmtpConfigInternalResponse extends SmtpConfigResponse {
  password: string;
}

export interface CreateSmtpConfigRequest {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromName: string;
  fromEmail: string;
  receiveEmail?: string | null;
}

export type UpdateSmtpConfigRequest = Partial<CreateSmtpConfigRequest>;
