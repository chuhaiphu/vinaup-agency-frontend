'use server';

import { revalidatePath } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  createUserApiPrivate,
  getUserByIdApiPrivate,
  updatePasswordApiPrivate,
  getAllUsersApiPrivate,
} from '@/apis/user-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import {
  CreateUserRequest,
  UpdatePasswordRequest,
  UserResponse,
} from '@/interfaces/user-interfaces';

export async function createUserActionPrivate(
  input: CreateUserRequest,
): Promise<ActionResponse<UserResponse>> {
  const result = await executeApi(async () => createUserApiPrivate(input));
  revalidatePath('/', 'layout');
  return result;
}

export async function getUserByIdActionPrivate(id: string): Promise<UserResponse | undefined> {
  const result = await executeApi(async () => getUserByIdApiPrivate(id));
  return result.data;
}

export async function getAllUsersActionPrivate(): Promise<UserResponse[] | undefined> {
  const result = await executeApi(async () => getAllUsersApiPrivate());
  return result.data;
}

export async function updateUserPasswordActionPrivate(
  input: UpdatePasswordRequest,
): Promise<ActionResponse<UserResponse>> {
  const result = await executeApi(async () => updatePasswordApiPrivate(input));
  revalidatePath('/adminup/user/[id]', 'page');
  return result;
}
