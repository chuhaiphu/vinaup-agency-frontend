import {
  CreateCustomerContactRequest,
  CustomerContactResponse,
} from '@/interfaces/customer-contact-interfaces';

import { mockApiResponse } from './_mock';
// When the backend is ready, swap the mock seam for the real transport:
// import { apiPublic } from './_base';

export async function createCustomerContactApiPublic(data: CreateCustomerContactRequest) {
  // --- MOCK (current) ---
  // Echo the submitted contact back as a synthetic created record.
  return mockApiResponse<CustomerContactResponse>({
    id: `mock-contact-${Date.now()}`,
    ...data,
    createdAt: new Date().toISOString(),
  });

  // --- REAL (when API is live) ---
  // return apiPublic<CustomerContactResponse>('/customer-contacts', {
  //   method: 'POST',
  //   body: JSON.stringify(data),
  // });
}
