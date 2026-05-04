/**
 * Checks whether an endpoint is an absolute external URL.
 *
 * @param endpoint - The endpoint string to check
 * @returns true if the endpoint starts with 'http://' or 'https://'
 * @example
 * validateExternalEndpoint('https://example.com') // true
 * validateExternalEndpoint('http://example.com')  // true
 * validateExternalEndpoint('/internal/path')      // false
 */
export function validateExternalEndpoint(endpoint: string): boolean {
  return endpoint.startsWith('http://') || endpoint.startsWith('https://');
}
