import { ParsedCookie } from '../classes/api-error';

/**
 * Parses a raw Set-Cookie header string into a structured cookie object.
 *
 * @param setCookie - The raw Set-Cookie header value, or null
 * @returns A ParsedCookie object with name, value, and options; returns empty fields if input is null
 * @example
 * generateParsedCookie('token=abc123; HttpOnly; Path=/; Max-Age=3600')
 * // { name: 'token', value: 'abc123', options: { httpOnly: true, path: '/', maxAge: 3600 } }
 *
 * generateParsedCookie(null)
 * // { name: '', value: '', options: {} }
 */
export function generateParsedCookie(setCookie: string | null): ParsedCookie {
  if (!setCookie) {
    return {
      name: '',
      value: '',
      options: {},
    };
  }
  const parts = setCookie.split(';').map((p) => p.trim());
  const [nameValue, ...attrs] = parts;
  const [name, value] = nameValue.split('=');
  const options: ParsedCookie['options'] = {};

  for (const attr of attrs) {
    const [key, val] = attr.split('=');

    switch (key.toLowerCase()) {
      case 'max-age':
        options.maxAge = Number(val);
        break;
      case 'path':
        options.path = val;
        break;
      case 'expires':
        options.expires = new Date(val);
        break;
      case 'httponly':
        options.httpOnly = true;
        break;
      case 'samesite':
        options.sameSite = val.toLowerCase() as 'lax' | 'strict' | 'none';
        break;
      case 'secure':
        options.secure = true;
        break;
    }
  }

  return { name, value, options };
}
