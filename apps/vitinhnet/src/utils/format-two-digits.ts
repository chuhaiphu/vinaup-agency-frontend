export function formatTwoDigits(num: number | string): string {
  const parsed = typeof num === 'string' ? parseInt(num, 10) : num;
  if (isNaN(parsed)) return '00';
  return parsed < 10 ? `0${parsed}` : `${parsed}`;
}
