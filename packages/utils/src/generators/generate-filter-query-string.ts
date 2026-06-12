/**
 * Builds a URL query string from a flat params object, skipping empty values.
 * Centralises query construction so API files never hand-roll `URLSearchParams`.
 *
 * @param params - Flat key/value map; `undefined`, `null` and `''` entries are dropped
 * @returns A query string with leading `?` (e.g. `?visibility=public`), or `''` when empty
 * @example
 * generateFilterQueryString({ visibility: 'public' })       // '?visibility=public'
 * generateFilterQueryString({ folder: 'blog', page: 2 })    // '?folder=blog&page=2'
 * generateFilterQueryString({ visibility: undefined })      // ''
 * generateFilterQueryString()                               // ''
 */
export const generateFilterQueryString = (
  params?: Record<string, string | number | boolean | null | undefined>,
): string => {
  if (!params) return '';

  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') continue;
    search.append(key, String(value));
  }

  const query = search.toString();
  return query ? `?${query}` : '';
};
