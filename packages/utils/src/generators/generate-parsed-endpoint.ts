/**
 * Normalizes an endpoint string into a valid URL or path.
 *
 * @param endpoint - Raw endpoint value, which may be null, undefined, a relative path, or a full URL
 * @returns A valid path or full URL; returns '/' for empty input, prepends 'https://' for bare hostnames
 * @example
 * generateParsedEndpoint(null)              // '/'
 * generateParsedEndpoint('/about')          // '/about'
 * generateParsedEndpoint('example.com')     // 'https://example.com'
 * generateParsedEndpoint('https://x.com')  // 'https://x.com'
 */
export function generateParsedEndpoint(endpoint: string | null | undefined): string {
  if (!endpoint) {
    return '/';
  }

  if (
    endpoint.startsWith('http://') ||
    endpoint.startsWith('https://') ||
    endpoint.startsWith('/')
  ) {
    return endpoint;
  }

  return `https://${endpoint}`;
}
