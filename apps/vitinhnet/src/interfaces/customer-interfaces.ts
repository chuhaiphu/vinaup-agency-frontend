export interface CustomerProfile {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  province: string;
  deliveryAddress: string;
  avatar?: string;
}

export interface UpdateCustomerProfileRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  province: string;
  deliveryAddress: string;
}
