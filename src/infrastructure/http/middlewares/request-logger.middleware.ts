import { Request, Response, NextFunction } from 'express';
import { logger } from '@/shared/logger/logger';

/** Logs method, path, status code and response time for every request. */
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const start = Date.now();

  res.on('finish', () => {
    logger.info(
      {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode,
        durationMs: Date.now() - start,
      },
      'request completed',
    );
  });

  next();
}
