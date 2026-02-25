import { ValidationError } from '@/shared/errors';

/**
 * Value Object representing an invoice reference month.
 *
 * Enforces the format expected by the Brazilian utility company: MMM/YYYY
 * (e.g. SET/2024). Month abbreviations are the Portuguese three-letter codes
 * as they appear on the original PDF invoices.
 */
export class ReferenceMonth {
  private static readonly VALID_MONTHS = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ];

  private static readonly FORMAT_REGEX = /^[A-Z]{3}\/\d{4}$/;

  public readonly value: string;

  constructor(value: string) {
    const normalized = value.trim().toUpperCase();

    if (!ReferenceMonth.FORMAT_REGEX.test(normalized)) {
      throw new ValidationError(
        `Invalid reference month format: "${value}". Expected MMM/YYYY (e.g. SET/2024).`,
      );
    }

    const [month] = normalized.split('/');
    if (!ReferenceMonth.VALID_MONTHS.includes(month)) {
      throw new ValidationError(
        `Invalid month abbreviation: "${month}". Must be one of: ${ReferenceMonth.VALID_MONTHS.join(', ')}.`,
      );
    }

    this.value = normalized;
  }

  equals(other: ReferenceMonth): boolean {
    return this.value === other.value;
  }

  toString(): string {
    return this.value;
  }
}
