import { CartItem, CheckoutFormData } from '@/interfaces/cart-interfaces';

export interface CreateOrderRequest {
  customer: CheckoutFormData;
  items: CartItem[];
}

export interface OrderResponse {
  id: string;
  status: string;
  total: number;
  createdAt: string;
}
