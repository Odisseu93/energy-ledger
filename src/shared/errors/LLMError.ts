import { AppError } from './AppError';

/** Thrown when the LLM API returns an HTTP error or times out (502 Bad Gateway). */
export class LLMError extends AppError {
  constructor(message: string = 'LLM service failed') {
    super(message, 502);
  }
}
