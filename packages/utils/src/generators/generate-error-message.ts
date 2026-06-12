/**
 * Extracts a human-readable message from an unknown thrown value.
 * Replaces the repeated `error instanceof Error ? error.message : '...'` checks
 * scattered across actions and components.
 *
 * Resolution order: raw string -> `Error.message` -> object with a string
 * `message` field -> fallback. `ApiError` is covered by the `Error` branch
 * since it extends `Error`.
 *
 * @param error - The caught value (`unknown`)
 * @param fallback - Message used when nothing usable is found
 * @returns A display-ready error message
 * @example
 * generateErrorMessage(new ApiError('Not found', 'NotFound', 404)) // 'Not found'
 * generateErrorMessage('boom')                                     // 'boom'
 * generateErrorMessage(null, 'Failed to delete blog')             // 'Failed to delete blog'
 */
export const generateErrorMessage = (error: unknown, fallback = 'Có lỗi xảy ra'): string => {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  if (
    error &&
    typeof error === 'object' &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  ) {
    return (error as { message: string }).message;
  }
  return fallback;
};
