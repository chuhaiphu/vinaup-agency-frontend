/**
 * Sanitizes an input string to only allow URL-safe characters.
 * Converts to lowercase, removes invalid characters, collapses multiple hyphens,
 * and trims hyphens from start and end.
 *
 * @param input - The string to sanitize
 * @returns Sanitized string safe for use as URL endpoints (e.g., 'My Blog Post!' -> 'my-blog-post')
 * @example
 * generateSanitizedEndpoint('Hello World!') // 'hello-world'
 * generateSanitizedEndpoint('My Blog Post!!!') // 'my-blog-post'
 */
export const generateSanitizedEndpoint = (input: string): string => {
    return input
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};
