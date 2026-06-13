'use server';

import { executeApi } from '@/actions/_base';
import { createCustomerContactApiPublic } from '@/apis/customer-contact-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import {
  CreateCustomerContactRequest,
  CustomerContactResponse,
} from '@/interfaces/customer-contact-interfaces';

export async function createCustomerContactActionPublic(
  input: CreateCustomerContactRequest,
): Promise<ActionResponse<CustomerContactResponse>> {
  return executeApi(() => createCustomerContactApiPublic(input));
}
