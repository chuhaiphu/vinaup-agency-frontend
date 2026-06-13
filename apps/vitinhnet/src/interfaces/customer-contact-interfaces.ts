export interface CreateCustomerContactRequest {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

export interface CustomerContactResponse {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  createdAt: string;
}
