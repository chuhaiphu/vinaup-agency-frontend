export interface AppConfigResponse {
  id: string;
  maintenanceMode: boolean;
  faviconUrl: string | null;
  logoUrl: string | null;
  emailContact: string | null;
  phoneContact: string | null;
  addressContact: string | null;
  workingHours: string | null;
  websiteTitle: string | null;
  websiteDescription: string | null;
}

export interface UpdateAppConfig {
  maintenanceMode?: boolean;
  faviconUrl?: string;
  logoUrl?: string;
  emailContact?: string;
  phoneContact?: string;
  addressContact?: string;
  workingHours?: string;
  websiteTitle?: string;
  websiteDescription?: string;
}
