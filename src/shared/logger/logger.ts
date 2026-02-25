import pino from 'pino';

const isDev = process.env.NODE_ENV !== 'production';

/**
 * Application logger instance.
 *
 * Uses pino-pretty transport in development for human-readable output.
 * In production, outputs structured JSON for log aggregation systems.
 */
export const logger = pino(
  {
    level: isDev ? 'debug' : 'info',
    redact: ['req.headers.authorization', 'DATABASE_URL', 'GEMINI_API_KEY'],
  },
  isDev
    ? pino.transport({
        target: 'pino-pretty',
        options: { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' },
      })
    : undefined,
);
