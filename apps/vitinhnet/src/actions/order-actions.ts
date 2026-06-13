'use server';

import { executeApi } from '@/actions/_base';
import { createOrderApiPublic } from '@/apis/order-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { CreateOrderRequest, OrderResponse } from '@/interfaces/order-interfaces';

export async function createOrderActionPublic(
  input: CreateOrderRequest,
): Promise<ActionResponse<OrderResponse>> {
  return executeApi(() => createOrderApiPublic(input));
}
