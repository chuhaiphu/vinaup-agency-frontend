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
  folder?: string;
}

export interface MediaResponse {
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
