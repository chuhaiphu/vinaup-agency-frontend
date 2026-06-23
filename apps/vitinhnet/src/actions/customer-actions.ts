'use server';

import { executeApi } from '@/actions/_base';
import {
  getCustomerProfileApiPrivate,
  updateCustomerProfileApiPrivate,
} from '@/apis/customer-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import { CustomerProfile, UpdateCustomerProfileRequest } from '@/interfaces/customer-interfaces';

export async function getCustomerProfileActionPrivate(): Promise<ActionResponse<CustomerProfile>> {
  return executeApi(() => getCustomerProfileApiPrivate());
}

export async function updateCustomerProfileActionPrivate(
  input: UpdateCustomerProfileRequest,
): Promise<ActionResponse<CustomerProfile>> {
  return executeApi(() => updateCustomerProfileApiPrivate(input));
}
