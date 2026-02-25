import { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '@/shared/errors';
import { logger } from '@/shared/logger/logger';

/**
 * Centralized error handler middleware.
 *
 * Maps AppError subclasses to their correct HTTP status codes and formats
 * a consistent error response. Stack traces are never exposed in production.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,

  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    if (err.statusCode >= 500) {
      logger.error({ err }, 'Operational error');
    }

    res.status(err.statusCode).json({
      success: false,
      error: {
        code: err.name,
        message: err.message,
      },
    });
    return;
  }

  // Multer file size exceeded
  if (err.message === 'File too large') {
    res.status(413).json({
      success: false,
      error: { code: 'FileTooLarge', message: 'Uploaded file exceeds the maximum allowed size.' },
    });
    return;
  }

  // Multer file type rejected
  if (err.message === 'Only PDF files are accepted') {
    const ve = new ValidationError('Only PDF files are accepted');
    res.status(ve.statusCode).json({
      success: false,
      error: { code: ve.name, message: ve.message },
    });
    return;
  }

  // Unknown / programming errors
  logger.error({ err }, 'Unexpected error');

  res.status(500).json({
    success: false,
    error: {
      code: 'InternalServerError',
      message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message,
    },
  });
}
