import { AppError } from './AppError';
import { ValidationError } from './ValidationError';
import { NotFoundError } from './NotFoundError';
import { LLMError } from './LLMError';
import { LLMParseError } from './LLMParseError';

describe('AppError', () => {
  it('should default to status 500 and isOperational true', () => {
    const error = new AppError('something went wrong');
    expect(error.statusCode).toBe(500);
    expect(error.isOperational).toBe(true);
    expect(error.message).toBe('something went wrong');
    expect(error.name).toBe('AppError');
  });

  it('should accept custom status code', () => {
    const error = new AppError('conflict', 409);
    expect(error.statusCode).toBe(409);
  });

  it('should be an instance of Error', () => {
    const error = new AppError('test');
    expect(error).toBeInstanceOf(Error);
  });
});

describe('ValidationError', () => {
  it('should have status 400', () => {
    const error = new ValidationError('invalid input');
    expect(error.statusCode).toBe(400);
    expect(error.message).toBe('invalid input');
    expect(error.name).toBe('ValidationError');
  });

  it('should be an instance of AppError', () => {
    expect(new ValidationError('x')).toBeInstanceOf(AppError);
  });
});

describe('NotFoundError', () => {
  it('should have status 404 and include the resource name', () => {
    const error = new NotFoundError('Invoice');
    expect(error.statusCode).toBe(404);
    expect(error.message).toBe('Invoice not found');
    expect(error.name).toBe('NotFoundError');
  });
});

describe('LLMError', () => {
  it('should have status 502 and default message', () => {
    const error = new LLMError();
    expect(error.statusCode).toBe(502);
    expect(error.message).toBe('LLM service failed');
    expect(error.name).toBe('LLMError');
  });

  it('should accept a custom message', () => {
    const error = new LLMError('Gemini API timeout');
    expect(error.message).toBe('Gemini API timeout');
  });
});

describe('LLMParseError', () => {
  it('should have status 422 and default message', () => {
    const error = new LLMParseError();
    expect(error.statusCode).toBe(422);
    expect(error.message).toBe('Failed to parse LLM response');
    expect(error.name).toBe('LLMParseError');
  });

  it('should accept a custom message', () => {
    const error = new LLMParseError('missing field: customer_number');
    expect(error.message).toBe('missing field: customer_number');
  });
});
