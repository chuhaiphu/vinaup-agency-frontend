import { UserResponse } from './user-interfaces';
import { TourCategoryTourResponse } from './tour-category-tour-interfaces';

export interface CreateTour {
  title: string;
  destinations: string[];
  endpoint: string;
  userId: string;
}

export interface UpdateTour extends Partial<CreateTour> {
  endpoint?: string;
  startDate?: Date;
  durationDays?: number;
  country?: string;
  description?: string;
  content?: string;
  visibility?: string;
  type?: string;
  sortOrder?: number;
  price?: number;
  discountPrice?: number;
  childPrice?: number;
  videoUrl?: string;
  videoThumbnailUrl?: string;
  videoPosition?: string;
  mainImageUrl?: string;
  additionalImageUrls?: string[];
  additionalImagesPosition?: string;
  categoryId?: string;
}

export interface TourResponse {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  country: string;
  destinations: string[];
  endpoint: string;
  startDate: Date;
  durationDays: number;
  visibility: string;
  sortOrder: number;
  type: string;
  price: number;
  originalPrice?: number;
  discountPrice: number;
  childPrice: number;
  videoUrl: string | null;
  videoThumbnailUrl: string | null;
  videoPosition: string | null;
  mainImageUrl: string | null;
  additionalImageUrls: string[];
  additionalImagesPosition: string | null;
  likes: number;
  views: number;
  createdBy: UserResponse | null;
  tourCategoryTours: TourCategoryTourResponse[];
  createdAt: Date;
  updatedAt: Date;
}
