export interface CreateCustomerContact {
  name: string;
  email: string;
  phone: string;
  notes?: string;
  recaptchaToken?: string;
}

export interface CustomerContactResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  createdAt: Date;
}

