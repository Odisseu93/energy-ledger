import { inject, injectable } from 'tsyringe';

import { IInvoiceRepository } from '@/domain/repositories/IInvoiceRepository';
import { InvoiceFiltersDto } from '@/application/dtos/invoice-filters.dto';
import { ProcessInvoiceOutputDto } from '@/application/dtos/process-invoice-output.dto';
import { InvoiceEntity } from '@/domain/entities/invoice.entity';

export interface ListInvoicesOutputDto {
  data: ProcessInvoiceOutputDto[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Returns a paginated and filtered list of stored invoices.
 */
@injectable()
export class ListInvoicesUseCase {
  constructor(
    @inject('IInvoiceRepository') private readonly invoiceRepository: IInvoiceRepository,
  ) {}

  async execute(filters: InvoiceFiltersDto): Promise<ListInvoicesOutputDto> {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;

    const { data, total } = await this.invoiceRepository.list({ ...filters, page, limit });

    return {
      data: data.map(this.toOutput),
      total,
      page,
      limit,
    };
  }

  private toOutput(invoice: InvoiceEntity): ProcessInvoiceOutputDto {
    return {
      id: invoice.id,
      customerId: invoice.customerId,
      customerNumber: invoice.customerNumber,
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
      processedAt: invoice.processedAt,
    };
  }
}
