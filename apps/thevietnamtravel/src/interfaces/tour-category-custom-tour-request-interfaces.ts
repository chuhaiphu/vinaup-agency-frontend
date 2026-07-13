import { TourCategoryResponse } from './tour-category-interfaces';
import { CustomTourRequestResponse } from './custom-tour-request-interfaces';

export interface CreateTourCategoryCustomTourRequest {
  tourCategoryId: string;
  customTourRequestId: string;
}

export interface TourCategoryCustomTourRequestResponse {
  id: string;
  tourCategoryId: string;
  customTourRequestId: string;
  tourCategory?: TourCategoryResponse;
  customTourRequest?: CustomTourRequestResponse;
}
