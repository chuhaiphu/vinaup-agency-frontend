export interface CreateSectionUICredentialsRequest {
  code: string;
  componentKey: string; // Internal key for component mapping (immutable)
  propertyFormat: Record<string, unknown>;
}

export interface UpdateSectionUICredentialsRequest {
  code?: string;
  // componentKey should NOT be updated - it's immutable
  propertyFormat?: Record<string, unknown>;
}

export interface SectionUICredentialsResponse {
  id: string;
  code: string;
  componentKey: string;
  propertyFormat: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
