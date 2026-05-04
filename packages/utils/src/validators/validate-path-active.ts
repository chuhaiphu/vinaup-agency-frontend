/**
 * Checks whether a given pathname matches a navigation item's path.
 *
 * @param pathname - The current browser pathname (e.g. '/blog/my-post')
 * @param itemPath - The navigation item's path to match against
 * @param isRoot - When true, requires an exact match instead of a prefix match
 * @returns true if the pathname matches or starts with itemPath (prefix match by default)
 * @example
 * validatePathActive('/blog/my-post', '/blog')        // true
 * validatePathActive('/blog', '/blog', true)           // true  (exact match)
 * validatePathActive('/blog/my-post', '/blog', true)  // false (root mode, not exact)
 * validatePathActive('/about', '/blog')               // false
 */
export function validatePathActive(pathname: string, itemPath: string, isRoot = false): boolean {
  if (!itemPath) return false;
  if (isRoot) {
    return pathname === itemPath;
  }
  if (pathname === itemPath) return true;
  return pathname.startsWith(itemPath + '/');
}
