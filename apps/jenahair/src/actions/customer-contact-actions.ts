'use server';
import { generateErrorMessage } from '@vinaup/utils';
import { revalidatePath } from 'next/cache';

import { executeApi } from '@/actions/_base';
import {
  getAllCustomerContactsAdminApiPrivate,
  createCustomerContactApiPublic,
  deleteCustomerContactApiPrivate,
} from '@/apis/customer-contact-apis';
import { ActionResponse } from '@/interfaces/_base-interfaces';
import {
  CreateCustomerContactRequest,
  CustomerContactResponse,
} from '@/interfaces/customer-contact-interfaces';

export async function getAllCustomerContactsActionPrivate(): Promise<
  ActionResponse<CustomerContactResponse[]>
> {
  const result = await executeApi(async () => getAllCustomerContactsAdminApiPrivate());
  return result;
}

export async function submitCustomerContactActionPublic(
  formData: FormData,
): Promise<ActionResponse<void>> {
  try {
    // Extract form data
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const notes = (formData.get('notes') as string) || undefined;
    const captchaToken = formData.get('captchaToken') as string;

    // Validate required fields
    if (!name || !email || !phone) {
      return { success: false, error: 'Name, email, and phone are required' };
    }

    // Validate reCAPTCHA token presence
    if (!captchaToken) {
      return { success: false, error: 'Please complete the reCAPTCHA' };
    }

    // Create customer contact data (backend will verify reCAPTCHA)
    const customerContactData: CreateCustomerContactRequest = {
      name,
      email,
      phone,
      notes,
      recaptchaToken: captchaToken,
    };

    const result = await executeApi(async () =>
      createCustomerContactApiPublic(customerContactData),
    );

    if (!result.success) {
      return result as ActionResponse<void>;
    }

    // Note: Email notifications should be handled by the backend

    revalidatePath('/adminup', 'layout');
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: generateErrorMessage(error, 'Failed to submit contact. Please try again.'),
    };
  }
}

export async function deleteCustomerContactActionPrivate(
  id: string,
): Promise<ActionResponse<void>> {
  const result = await executeApi(async () => deleteCustomerContactApiPrivate(id));
  revalidatePath('/adminup', 'layout');
  return result;
}
