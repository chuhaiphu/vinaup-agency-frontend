export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  isSelected: boolean;
}

export interface CheckoutCustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export interface CheckoutFormData {
  billing: CheckoutCustomerInfo;
  shipping: CheckoutCustomerInfo;
  useBillingForShipping: boolean;
  agreeToTerms?: boolean;
}
