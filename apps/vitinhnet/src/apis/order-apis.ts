import { CreateOrderRequest, OrderResponse } from '@/interfaces/order-interfaces';

import { mockApiResponse } from './_mock';
// When the backend is ready, swap the mock seam for the real transport:
// import { apiPublic } from './_base';

export async function createOrderApiPublic(data: CreateOrderRequest) {
  // --- MOCK (current) ---
  // Compute the order total from the submitted cart, echo a synthetic created order.
  const total = data.items
    .filter((item) => item.isSelected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);
  return mockApiResponse<OrderResponse>({
    id: `mock-order-${Date.now()}`,
    status: 'pending',
    total,
    createdAt: new Date().toISOString(),
  });

  // --- REAL (when API is live) ---
  // return apiPublic<OrderResponse>('/orders', { method: 'POST', body: JSON.stringify(data) });
}
