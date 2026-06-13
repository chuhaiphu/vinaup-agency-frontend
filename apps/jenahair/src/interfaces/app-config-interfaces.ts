export interface AppConfigResponse {
  id: string;
  maintenanceMode: boolean;
  faviconUrl: string | null;
  logoUrl: string | null;
  emailContact: string | null;
  phoneContact: string | null;
  addressContact: string | null;
  siteName: string | null;
  websiteTitle: string | null;
  websiteDescription: string | null;
}

export interface UpdateAppConfigRequest {
  maintenanceMode?: boolean;
  faviconUrl?: string;
  logoUrl?: string;
  emailContact?: string;
  phoneContact?: string;
  addressContact?: string;
  siteName?: string;
  websiteTitle?: string;
  websiteDescription?: string;
}
