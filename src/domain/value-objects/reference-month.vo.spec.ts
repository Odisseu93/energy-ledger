import { ReferenceMonth } from './reference-month.vo';
import { ValidationError } from '@/shared/errors';

describe('ReferenceMonth', () => {
  describe('valid values', () => {
    it('should accept a valid month in uppercase', () => {
      const vo = new ReferenceMonth('SET/2024');
      expect(vo.value).toBe('SET/2024');
    });

    it('should normalize lowercase input to uppercase', () => {
      const vo = new ReferenceMonth('jan/2025');
      expect(vo.value).toBe('JAN/2025');
    });

    it('should accept all twelve valid month abbreviations', () => {
      const months = [
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
      months.forEach((m) => {
        expect(() => new ReferenceMonth(`${m}/2024`)).not.toThrow();
      });
    });
  });

  describe('invalid values', () => {
    it('should throw ValidationError for wrong format', () => {
      expect(() => new ReferenceMonth('09/2024')).toThrow(ValidationError);
      expect(() => new ReferenceMonth('SETEMBRO/2024')).toThrow(ValidationError);
      expect(() => new ReferenceMonth('SET-2024')).toThrow(ValidationError);
      expect(() => new ReferenceMonth('')).toThrow(ValidationError);
    });

    it('should throw ValidationError for an invalid month abbreviation', () => {
      expect(() => new ReferenceMonth('XYZ/2024')).toThrow(ValidationError);
    });
  });

  describe('equals', () => {
    it('should return true when both values are the same', () => {
      expect(new ReferenceMonth('SET/2024').equals(new ReferenceMonth('SET/2024'))).toBe(true);
    });

    it('should return false when values differ', () => {
      expect(new ReferenceMonth('SET/2024').equals(new ReferenceMonth('OUT/2024'))).toBe(false);
    });
  });

  describe('toString', () => {
    it('should return the string value', () => {
      expect(new ReferenceMonth('SET/2024').toString()).toBe('SET/2024');
    });
  });
});
