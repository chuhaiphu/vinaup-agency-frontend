/**
 * Checks whether a file is a valid image type (PNG, JPEG, or JPG).
 *
 * @param file - The File object to validate
 * @returns true if the file's MIME type is one of image/png, image/jpeg, or image/jpg
 * @example
 * validateImageFile(pngFile)  // true
 * validateImageFile(pdfFile)  // false
 */
export const validateImageFile = (file: File): boolean => {
  const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  return validTypes.includes(file.type);
};
