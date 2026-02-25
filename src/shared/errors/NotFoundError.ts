import { AppError } from './AppError';

/** Thrown when a requested resource does not exist (404 Not Found). */
export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}
