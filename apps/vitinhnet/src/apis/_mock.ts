import { HttpResponse } from '@/interfaces/_base-interfaces';

/**
 * Wraps static mock data in the exact `HttpResponse<T>` envelope a live backend returns,
 * so `executeApi` and the entire action layer behave identically to a real `apiPublic` call.
 *
 * This is the ONLY mock-specific seam in the data layer. When the backend is ready:
 *   1. set `API_URL` in `.env`,
 *   2. switch each `*-apis.ts` function from `mockApiResponse(...)` to `apiPublic/apiPrivate`,
 *   3. delete this file.
 * Interfaces, actions, pages and components stay untouched. → REPOSITORY-PATTERN §Why
 */
export async function mockApiResponse<T>(data: T): Promise<HttpResponse<T>> {
  return { statusCode: 200, data, message: 'OK' };
}
