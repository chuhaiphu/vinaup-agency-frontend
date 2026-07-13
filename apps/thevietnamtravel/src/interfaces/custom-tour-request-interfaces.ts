import { TourCategoryCustomTourRequestResponse } from './tour-category-custom-tour-request-interfaces';

export interface CreateCustomTourRequest {
  startDate: Date;
  endDate: Date;
  adultCount: number;
  childCount: number;
  destinations: string[];
  hotelType?: string;
  roomType?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes?: string;
  recaptchaToken?: string;
}

export type IUpdateCustomTourRequest = Partial<CreateCustomTourRequest>;

export interface CustomTourRequestResponse {
  id: string;
  startDate: Date;
  endDate: Date;
  adultCount: number;
  childCount: number;
  destinations: string[];
  hotelType: string | null;
  roomType: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes: string | null;
  tourCategoryCustomTourRequests?: TourCategoryCustomTourRequestResponse[];
  createdAt: Date;
  updatedAt: Date;
}
