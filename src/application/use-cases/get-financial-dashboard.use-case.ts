import { inject, injectable } from 'tsyringe';

import { IInvoiceRepository } from '@/domain/repositories/IInvoiceRepository';
import { FinancialDashboardDto } from '@/application/dtos/financial-dashboard.dto';

/**
 * Returns aggregated financial data grouped by reference month.
 */
@injectable()
export class GetFinancialDashboardUseCase {
  constructor(
    @inject('IInvoiceRepository') private readonly invoiceRepository: IInvoiceRepository,
  ) {}

  async execute(customerNumber?: string): Promise<FinancialDashboardDto> {
    return this.invoiceRepository.getFinancialDashboard(customerNumber);
  }
}
