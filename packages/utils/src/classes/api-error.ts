/**
 * Represents an API error with HTTP status code and error type.
 *
 * @param message - Human-readable error description
 * @param error - Short error type identifier (e.g. "Unauthorized")
 * @param statusCode - HTTP status code (e.g. 401, 404, 500)
 *
 * @returns An Error instance enriched with statusCode and error fields
 * @example throw new ApiError('Not found', 'NotFound', 404)
 */
export class ApiError extends Error {
  public statusCode: number;
  public error: string;

  constructor(message: string, error: string, statusCode: number) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }
}

/**
 * Represents a parsed Set-Cookie header as a structured object.
 *
 * @example
 * { name: 'token', value: 'abc123', options: { httpOnly: true, path: '/' } }
 */
export interface ParsedCookie {
  name: string;
  value: string;
  options: {
    maxAge?: number;
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    secure?: boolean;
  };
}
