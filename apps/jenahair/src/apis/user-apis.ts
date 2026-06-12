import {
  CreateUserRequest,
  UpdatePasswordRequest,
  UserResponse,
} from '@/interfaces/user-interfaces';

import { apiPrivate } from './_base';

export async function createUserApiPrivate(data: CreateUserRequest) {
  return apiPrivate<UserResponse>('/users/admin', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getAllUsersApiPrivate() {
  return apiPrivate<UserResponse[]>('/users/admin', {
    method: 'GET',
  });
}

export async function getUserByIdApiPrivate(id: string) {
  return apiPrivate<UserResponse>(`/users/admin/${id}`, {
    method: 'GET',
  });
}

export async function updateUserApiPrivate(id: string, data: Partial<CreateUserRequest>) {
  return apiPrivate<UserResponse>(`/users/admin/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function updatePasswordApiPrivate(data: UpdatePasswordRequest) {
  return apiPrivate<UserResponse>(`/users/admin/${data.userId}`, {
    method: 'PUT',
    body: JSON.stringify({ password: data.newPassword }),
  });
}

export async function deleteUserApiPrivate(id: string) {
  return apiPrivate<void>(`/users/admin/${id}`, {
    method: 'DELETE',
  });
}
