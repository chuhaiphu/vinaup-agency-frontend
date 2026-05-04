/**
 * Converts a byte count into a human-readable file size string.
 *
 * @param bytes - File size in bytes
 * @returns Formatted size string with unit (Bytes, KB, or MB)
 * @example
 * generateFormattedFileSize(0)       // '0 Bytes'
 * generateFormattedFileSize(1024)    // '1 KB'
 * generateFormattedFileSize(1536)    // '1.5 KB'
 * generateFormattedFileSize(2097152) // '2 MB'
 */
export const generateFormattedFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};
