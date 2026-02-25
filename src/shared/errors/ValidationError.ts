import { AppError } from './AppError';

/** Thrown when request input fails validation (400 Bad Request). */
export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}
