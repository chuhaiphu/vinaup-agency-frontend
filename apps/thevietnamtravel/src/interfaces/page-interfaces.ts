import { UserResponse } from "./user-interfaces";

export interface CreatePage {
  title: string;
  destinations: string[];
  endpoint: string;
  userId: string;
}

export interface UpdatePage extends Partial<CreatePage> {
  endpoint?: string;
  country?: string;
  type?: string;
  description?: string;
  content?: string;
  visibility?: string;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  videoPosition?: string;
  mainImageUrl?: string;
  additionalImageUrls?: string[];
  additionalImagesPosition?: string;
}

export interface PageResponse {
  id: string;
  title: string;
  type: string;
  description: string | null;
  content: string | null;
  country: string;
  destinations: string[];
  endpoint: string;
  visibility: string;
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string | null;
  mainImageUrl: string | null;
  additionalImageUrls: string[];
  additionalImagesPosition: string | null;
  createdBy: UserResponse | null;
  createdAt: Date;
  updatedAt: Date;
}

