export interface SmtpResponse {
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

export interface SmtpInternalResponse extends SmtpResponse {
  password: string;
}

export interface CreateSmtp {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromName: string;
  fromEmail: string;
  receiveEmail?: string | null;
}

export type IUpdateSmtp = Partial<CreateSmtp>;
