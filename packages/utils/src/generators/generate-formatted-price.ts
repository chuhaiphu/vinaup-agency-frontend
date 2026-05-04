/**
 * Formats a numeric price into a Vietnamese locale string.
 *
 * @param price - Numeric price value to format
 * @returns Formatted price string using Vietnamese locale (e.g. thousands separator as ".")
 * @example
 * generateFormattedPrice(150000) // '150.000'
 */
export const generateFormattedPrice = (price: number): string => {
  return price.toLocaleString('vi-VN');
};
