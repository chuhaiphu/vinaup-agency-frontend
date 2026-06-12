import { SectionUICredentialsResponse } from './section-ui-credentials-interfaces';

export interface CreateDynamicSectionUIRequest {
  position: number;
  sectionUICredentialsId?: string | null;
  properties?: Record<string, unknown> | null;
}

export interface UpdateDynamicSectionUIRequest {
  position?: number;
  sectionUICredentialsId?: string | null;
  properties?: Record<string, unknown> | null;
}

export interface DynamicSectionUIResponse {
  id: string;
  position: number;
  sectionUICredentialsId: string | null;
  sectionUICredentials?: SectionUICredentialsResponse | null;
  properties: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}
