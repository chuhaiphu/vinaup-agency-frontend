/**
 * Converts a numeric duration in days into a human-readable string.
 *
 * @param durationDays - Duration value in days (supports 0.5 for half-day)
 * @returns Formatted string representation of the duration
 * @example
 * generateDurationDays(0.5) // 'Half day'
 * generateDurationDays(1)   // '1 day'
 * generateDurationDays(3)   // '3 days'
 */
export const generateDurationDays = (durationDays: number): string => {
  if (durationDays === 0.5) {
    return 'Half day';
  }
  if (durationDays === 1) {
    return '1 day';
  }
  return `${durationDays} days`;
};
