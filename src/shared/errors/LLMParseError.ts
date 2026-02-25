import { AppError } from './AppError';

/**
 * Thrown when the LLM returns a response that cannot be parsed into the
 * expected JSON structure (422 Unprocessable Entity).
 */
export class LLMParseError extends AppError {
  constructor(message: string = 'Failed to parse LLM response') {
    super(message, 422);
  }
}
