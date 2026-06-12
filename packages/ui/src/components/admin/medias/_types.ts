export interface Media {
  id: string;
  name: string;
  title: string | null;
  description: string | null;
  url: string;
  type: string;
  folder: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMediaRequest {
  name: string;
  title?: string | null;
  description?: string | null;
  url: string;
  type: string;
  folder: string;
}

export interface UpdateMediaRequest {
  name?: string;
  title?: string | null;
  description?: string | null;
}

export interface UploadResult {
  url: string;
  name: string;
}

export interface MediaUploadHandlers {
  onUpload: (files: File[]) => Promise<UploadResult[]>;
  onSave?: (data: CreateMediaRequest[]) => Promise<Media[]>;
  onUploadSuccess?: (media: Media[]) => void;
  onUploadError?: (error: Error) => void;
}

export interface MediaGridHandlers {
  onImageSelect: (imageId: string) => void;
  onLoadImages: () => Promise<Media[]>;
}

export interface MediaDetailHandlers {
  onUpdate: (id: string, data: UpdateMediaRequest) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onNavigateBack: () => void;
}

export interface MediaTabsConfig {
  tabs: { value: string; label: string }[];
  activeTab: string;
  onTabChange: (value: string) => void;
}
