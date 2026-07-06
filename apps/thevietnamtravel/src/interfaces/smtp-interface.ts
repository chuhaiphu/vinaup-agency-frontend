export interface ISmtpResponse {
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

export interface ISmtpInternalResponse extends ISmtpResponse {
  password: string;
}

export interface ICreateSmtp {
  host: string;
  port: number;
  secure: boolean;
  username: string;
  password: string;
  fromName: string;
  fromEmail: string;
  receiveEmail?: string | null;
}

export type IUpdateSmtp = Partial<ICreateSmtp>;
