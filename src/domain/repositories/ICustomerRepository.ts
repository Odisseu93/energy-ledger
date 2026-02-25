import { CustomerEntity } from '@/domain/entities/customer.entity';

/**
 * Port for customer persistence operations.
 */
export interface ICustomerRepository {
  findOrCreateByNumber(customerNumber: string): Promise<CustomerEntity>;
  findByNumber(customerNumber: string): Promise<CustomerEntity | null>;
}
