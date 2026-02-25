import { InvoiceEntity, InvoiceRawData } from './invoice.entity';

const makeRaw = (overrides: Partial<InvoiceRawData> = {}): InvoiceRawData => ({
  customerNumber: '7202210726',
  referenceMonth: 'SET/2024',
  electricEnergyKwh: 50,
  electricEnergyValue: 38.63,
  sceeeEnergyKwh: 476,
  sceeeEnergyValue: 366.28,
  compensatedEnergyKwh: 476,
  compensatedEnergyValue: -354.11,
  publicLightingContrib: 49.43,
  ...overrides,
});

describe('InvoiceEntity', () => {
  describe('calculated fields', () => {
    it('should calculate energyConsumptionKwh as electricEnergyKwh + sceeeEnergyKwh', () => {
      const invoice = InvoiceEntity.fromRaw('id-1', 'customer-1', makeRaw());
      expect(invoice.energyConsumptionKwh).toBeCloseTo(526); // 50 + 476
    });

    it('should calculate totalValueWithoutGd as electric + sceee + publicLighting', () => {
      const invoice = InvoiceEntity.fromRaw('id-1', 'customer-1', makeRaw());
      expect(invoice.totalValueWithoutGd).toBeCloseTo(454.34); // 38.63 + 366.28 + 49.43
    });

    it('should set gdSavings to the compensated energy value preserving the sign', () => {
      const invoice = InvoiceEntity.fromRaw('id-1', 'customer-1', makeRaw());
      expect(invoice.gdSavings).toBeCloseTo(-354.11);
    });
  });

  describe('fromRaw', () => {
    it('should map all raw fields correctly', () => {
      const raw = makeRaw();
      const invoice = InvoiceEntity.fromRaw('uuid-1', 'customer-uuid', raw);

      expect(invoice.id).toBe('uuid-1');
      expect(invoice.customerId).toBe('customer-uuid');
      expect(invoice.customerNumber).toBe(raw.customerNumber);
      expect(invoice.referenceMonth).toBe(raw.referenceMonth);
      expect(invoice.electricEnergyKwh).toBe(raw.electricEnergyKwh);
      expect(invoice.electricEnergyValue).toBe(raw.electricEnergyValue);
      expect(invoice.sceeeEnergyKwh).toBe(raw.sceeeEnergyKwh);
      expect(invoice.sceeeEnergyValue).toBe(raw.sceeeEnergyValue);
      expect(invoice.compensatedEnergyKwh).toBe(raw.compensatedEnergyKwh);
      expect(invoice.compensatedEnergyValue).toBe(raw.compensatedEnergyValue);
      expect(invoice.publicLightingContrib).toBe(raw.publicLightingContrib);
      expect(invoice.fileUrl).toBeNull();
    });

    it('should store the optional fileUrl when provided', () => {
      const invoice = InvoiceEntity.fromRaw('id-1', 'c-1', makeRaw(), '/uploads/invoice.pdf');
      expect(invoice.fileUrl).toBe('/uploads/invoice.pdf');
    });
  });

  describe('edge cases', () => {
    it('should handle zero values without NaN', () => {
      const invoice = InvoiceEntity.fromRaw(
        'id-1',
        'c-1',
        makeRaw({
          electricEnergyKwh: 0,
          sceeeEnergyKwh: 0,
          electricEnergyValue: 0,
          sceeeEnergyValue: 0,
          publicLightingContrib: 0,
        }),
      );
      expect(invoice.energyConsumptionKwh).toBe(0);
      expect(invoice.totalValueWithoutGd).toBe(0);
    });
  });
});
