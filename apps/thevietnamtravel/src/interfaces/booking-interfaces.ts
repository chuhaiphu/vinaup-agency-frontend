import { TourResponse } from './tour-interfaces';

export interface CreateBooking {
  tourId: string;
  adultCount: number;
  childCount: number;
  adultPrice: number;
  childPrice: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes?: string;
  recaptchaToken?: string;
}

export interface UpdateBooking extends Partial<CreateBooking> {
  status?: string;
}

export interface BookingResponse {
  id: string;
  tourId: string;
  tour: TourResponse;
  status: string;
  adultCount: number;
  childCount: number;
  adultPrice: number;
  childPrice: number;
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerNotes: string | null;
  createdAt: Date;
  updatedAt: Date;
}
