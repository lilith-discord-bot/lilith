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
