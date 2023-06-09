import { Logger } from '../lib/Logger';

/**
 * Duration in milliseconds for common time units.
 * @type {Object}
 */
export const duration = {
  seconds: (n: number) => n * 1000,
  minutes: (n: number) => n * 1000 * 60,
  hours: (n: number) => n * 1000 * 60 * 60,
  days: (n: number) => n * 1000 * 60 * 60 * 24,
};

/**
 * Checks if the current environment is development.
 * @type {boolean}
 */
export const isDev = process.env.NODE_ENV === 'development';

export async function request(
  url: string,
  json = false,
  method = 'GET' || 'POST' || 'PUT' || 'DELETE',
  headers = {},
  body?: RequestInit['body'],
) {

  if (!url) throw new Error('No URL provided.');
  else {

    let req = null;

    try {

      let options: RequestInit = {
        method,
        headers,
      };

      if (method !== 'GET') options.body = body;

      req = await fetch(url, options);

      if (json) return await req.json();
      else return await req.text();
      
    } catch (error) {
      Logger.error(error);
      req = null;
    }

    return req;
  }
}
