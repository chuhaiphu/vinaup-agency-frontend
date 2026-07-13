import { TourResponse } from './tour-interfaces';
import { TourCategoryResponse } from './tour-category-interfaces';

export interface CreateTourCategoryTour {
  tourCategoryId: string;
  tourId: string;
  sortOrder?: number;
}

export interface UpdateTourCategoryTour {
  sortOrder?: number;
}

export interface TourCategoryTourResponse {
  id: string;
  tourCategoryId: string;
  tourId: string;
  sortOrder: number;
  tourCategory?: TourCategoryResponse;
  tour?: TourResponse;
}
