/**
 * Strips all HTML tags from a string and truncates to a maximum length.
 *
 * @param html - Raw HTML string to process
 * @param maxLength - Maximum number of characters to return
 * @returns Plain text with all tags removed, truncated if it exceeds maxLength
 * @example
 * generateStrippedHtml('<p>Hello <b>world</b></p>', 5) // 'Hello'
 */
export const generateStrippedHtml = (html: string, maxLength: number): string => {
  const text = html.replace(/<[^>]*>/g, '');
  return text.length > maxLength ? text.substring(0, maxLength) : text;
};
