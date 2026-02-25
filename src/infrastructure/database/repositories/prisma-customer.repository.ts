import { randomUUID } from 'crypto';
import { injectable } from 'tsyringe';

import { ICustomerRepository } from '@/domain/repositories/ICustomerRepository';
import { CustomerEntity } from '@/domain/entities/customer.entity';
import { prisma } from '../prisma/prisma-client';

@injectable()
export class PrismaCustomerRepository implements ICustomerRepository {
  /**
   * Finds an existing customer or creates one if none exists for the given number.
   *
   * Uses upsert to handle concurrent upload requests for the same customer safely.
   * The numeric string is stored as-is to preserve leading zeros if present.
   */
  async findOrCreateByNumber(customerNumber: string): Promise<CustomerEntity> {
    const record = await prisma.customer.upsert({
      where: { customerNumber },
      create: { id: randomUUID(), customerNumber },
      update: {},
    });

    return new CustomerEntity(record.id, record.customerNumber, record.createdAt);
  }

  async findByNumber(customerNumber: string): Promise<CustomerEntity | null> {
    const record = await prisma.customer.findUnique({ where: { customerNumber } });
    if (!record) return null;
    return new CustomerEntity(record.id, record.customerNumber, record.createdAt);
  }
}
