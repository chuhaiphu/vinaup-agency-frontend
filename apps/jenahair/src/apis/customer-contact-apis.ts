import {
  CreateCustomerContactRequest,
  CustomerContactResponse,
} from '@/interfaces/customer-contact-interfaces';

import { apiPrivate, apiPublic } from './_base';

// ==================== PUBLIC ROUTES ====================

export async function createCustomerContactApiPublic(data: CreateCustomerContactRequest) {
  return apiPublic<CustomerContactResponse>('/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ==================== ADMIN ROUTES ====================
export async function getAllCustomerContactsAdminApiPrivate() {
  return apiPrivate<CustomerContactResponse[]>(`/contacts/admin`, {
    method: 'GET',
  });
}

export async function getCustomerContactByIdApiPrivate(id: string) {
  return apiPrivate<CustomerContactResponse>(`/contacts/admin/${id}`, {
    method: 'GET',
  });
}

export async function deleteCustomerContactApiPrivate(id: string) {
  return apiPrivate<void>(`/contacts/admin/${id}`, {
    method: 'DELETE',
  });
}
