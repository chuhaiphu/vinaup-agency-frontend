import { generateErrorMessage } from '@vinaup/utils';
import { unstable_rethrow } from 'next/navigation';

import { ActionResponse, HttpResponse } from '@/interfaces/_base-interfaces';

const isSuccessStatusCode = (statusCode: number | undefined) => {
  if (!statusCode) return false;
  return statusCode >= 200 && statusCode < 300;
};

/**
 * API Executor that handles delay and returns ActionResponse
 * @param fn - Async function that returns the data or void
 */
export async function executeApi<T>(
  fn: () => Promise<HttpResponse<T>>,
  options?: {
    delay?: boolean;
    delayMs?: number;
  },
): Promise<ActionResponse<T>> {
  if (options?.delay) {
    await new Promise((resolve) => setTimeout(resolve, options.delayMs || 0));
  }

  try {
    const httpResponse = await fn();
    if (!isSuccessStatusCode(httpResponse.statusCode)) {
      return {
        success: false,
        error: httpResponse.error + ' - ' + httpResponse.message,
      };
    }
    return {
      success: true,
      data: httpResponse.data,
    };
  } catch (error: unknown) {
    unstable_rethrow(error);
    return {
      success: false,
      error: generateErrorMessage(error, 'Unexpected error occurred'),
    };
  }
}
