import { injectable } from 'tsyringe';
import { Prisma } from '@prisma/client';

import { IInvoiceRepository } from '@/domain/repositories/IInvoiceRepository';
import { InvoiceEntity } from '@/domain/entities/invoice.entity';
import { InvoiceFiltersDto } from '@/application/dtos/invoice-filters.dto';
import {
  EnergyDashboardDto,
  EnergyDashboardItemDto,
} from '@/application/dtos/energy-dashboard.dto';
import {
  FinancialDashboardDto,
  FinancialDashboardItemDto,
} from '@/application/dtos/financial-dashboard.dto';
import { prisma } from '../prisma/prisma-client';

@injectable()
export class PrismaInvoiceRepository implements IInvoiceRepository {
  async save(invoice: InvoiceEntity): Promise<void> {
    await prisma.invoice.upsert({
      where: {
        customerId_referenceMonth: {
          customerId: invoice.customerId,
          referenceMonth: invoice.referenceMonth,
        },
      },
      create: {
        id: invoice.id,
        customerId: invoice.customerId,
        referenceMonth: invoice.referenceMonth,
        electricEnergyKwh: invoice.electricEnergyKwh,
        electricEnergyValue: invoice.electricEnergyValue,
        sceeeEnergyKwh: invoice.sceeeEnergyKwh,
        sceeeEnergyValue: invoice.sceeeEnergyValue,
        compensatedEnergyKwh: invoice.compensatedEnergyKwh,
        compensatedEnergyValue: invoice.compensatedEnergyValue,
        publicLightingContrib: invoice.publicLightingContrib,
        energyConsumptionKwh: invoice.energyConsumptionKwh,
        totalValueWithoutGd: invoice.totalValueWithoutGd,
        gdSavings: invoice.gdSavings,
        fileUrl: invoice.fileUrl,
      },
      update: {
        electricEnergyKwh: invoice.electricEnergyKwh,
        electricEnergyValue: invoice.electricEnergyValue,
        sceeeEnergyKwh: invoice.sceeeEnergyKwh,
        sceeeEnergyValue: invoice.sceeeEnergyValue,
        compensatedEnergyKwh: invoice.compensatedEnergyKwh,
        compensatedEnergyValue: invoice.compensatedEnergyValue,
        publicLightingContrib: invoice.publicLightingContrib,
        energyConsumptionKwh: invoice.energyConsumptionKwh,
        totalValueWithoutGd: invoice.totalValueWithoutGd,
        gdSavings: invoice.gdSavings,
        fileUrl: invoice.fileUrl,
      },
    });
  }

  async list(filters: InvoiceFiltersDto): Promise<{ data: InvoiceEntity[]; total: number }> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Prisma.InvoiceWhereInput = {};

    if (filters.customerNumber) {
      where.customer = { customerNumber: filters.customerNumber };
    }

    if (filters.referenceMonth) {
      where.referenceMonth = filters.referenceMonth;
    }

    const [records, total] = await prisma.$transaction([
      prisma.invoice.findMany({
        where,
        skip,
        take: limit,
        orderBy: { processedAt: 'desc' },
        include: { customer: true },
      }),
      prisma.invoice.count({ where }),
    ]);

    const data = records.map(
      (r) =>
        new InvoiceEntity(
          r.id,
          r.customerId,
          r.customer.customerNumber,
          r.referenceMonth,
          r.electricEnergyKwh,
          r.electricEnergyValue,
          r.sceeeEnergyKwh,
          r.sceeeEnergyValue,
          r.compensatedEnergyKwh,
          r.compensatedEnergyValue,
          r.publicLightingContrib,
          r.fileUrl,
          r.processedAt,
        ),
    );

    return { data, total };
  }

  async getEnergyDashboard(customerNumber?: string): Promise<EnergyDashboardDto> {
    const where: Prisma.InvoiceWhereInput = customerNumber ? { customer: { customerNumber } } : {};

    const records = await prisma.invoice.findMany({
      where,
      select: {
        referenceMonth: true,
        energyConsumptionKwh: true,
        compensatedEnergyKwh: true,
      },
      orderBy: { referenceMonth: 'asc' },
    });

    const data: EnergyDashboardItemDto[] = records.map((r) => ({
      referenceMonth: r.referenceMonth,
      energyConsumptionKwh: r.energyConsumptionKwh,
      compensatedEnergyKwh: r.compensatedEnergyKwh,
    }));

    return { customerNumber, data };
  }

  async getFinancialDashboard(customerNumber?: string): Promise<FinancialDashboardDto> {
    const where: Prisma.InvoiceWhereInput = customerNumber ? { customer: { customerNumber } } : {};

    const records = await prisma.invoice.findMany({
      where,
      select: {
        referenceMonth: true,
        totalValueWithoutGd: true,
        gdSavings: true,
      },
      orderBy: { referenceMonth: 'asc' },
    });

    const data: FinancialDashboardItemDto[] = records.map((r) => ({
      referenceMonth: r.referenceMonth,
      totalValueWithoutGd: r.totalValueWithoutGd,
      gdSavings: r.gdSavings,
    }));

    return { customerNumber, data };
  }
}
