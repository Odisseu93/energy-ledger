import { CustomerEntity } from './customer.entity';

describe('CustomerEntity', () => {
  describe('constructor', () => {
    it('should store id and customerNumber', () => {
      const customer = new CustomerEntity('uuid-1', '7202210726');
      expect(customer.id).toBe('uuid-1');
      expect(customer.customerNumber).toBe('7202210726');
    });

    it('should default createdAt to the current date when not provided', () => {
      const before = new Date();
      const customer = new CustomerEntity('uuid-1', '7202210726');
      const after = new Date();
      expect(customer.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime());
      expect(customer.createdAt.getTime()).toBeLessThanOrEqual(after.getTime());
    });

    it('should accept an explicit createdAt date', () => {
      const date = new Date('2024-01-15T10:00:00.000Z');
      const customer = new CustomerEntity('uuid-1', '7202210726', date);
      expect(customer.createdAt).toBe(date);
    });

    it('should create distinct instances that do not share state', () => {
      const c1 = new CustomerEntity('uuid-1', '1111111111');
      const c2 = new CustomerEntity('uuid-2', '2222222222');
      expect(c1.id).not.toBe(c2.id);
      expect(c1.customerNumber).not.toBe(c2.customerNumber);
    });
  });
});
