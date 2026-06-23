import { CustomerProfile, UpdateCustomerProfileRequest } from '@/interfaces/customer-interfaces';

import { mockApiResponse } from './_mock';

// Seeded local storage mock representation for user profile
let cachedProfile: CustomerProfile = {
  id: 'customer-1',
  fullName: 'Nguyễn Minh Phước',
  phoneNumber: '0123456789',
  email: 'vinaup@gmail.com',
  province: '',
  deliveryAddress: '',
  avatar: '/images/default-avatar.png', // Fallback avatar reference
};

export async function getCustomerProfileApiPrivate() {
  return mockApiResponse<CustomerProfile>({ ...cachedProfile });
}

export async function updateCustomerProfileApiPrivate(data: UpdateCustomerProfileRequest) {
  cachedProfile = {
    ...cachedProfile,
    ...data,
  };
  return mockApiResponse<CustomerProfile>({ ...cachedProfile });
}
