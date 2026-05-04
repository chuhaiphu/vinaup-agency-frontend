/**
 * Joins a list of class name strings into a single space-separated string, filtering out falsy values.
 *
 * @param classNames - Any number of class name strings or undefined values
 * @returns A single string of space-separated class names with falsy values removed
 * @example
 * generateClassName('btn', 'btn-primary', undefined) // 'btn btn-primary'
 * generateClassName('card', isActive && 'card--active') // 'card card--active' or 'card'
 */
export const generateClassName = (...classNames: (string | undefined)[]): string => {
  return classNames.filter(Boolean).join(' ');
};
