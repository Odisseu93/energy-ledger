import { inject, injectable } from 'tsyringe';

import { IInvoiceRepository } from '@/domain/repositories/IInvoiceRepository';
import { EnergyDashboardDto } from '@/application/dtos/energy-dashboard.dto';

/**
 * Returns aggregated energy consumption data grouped by reference month.
 */
@injectable()
export class GetEnergyDashboardUseCase {
  constructor(
    @inject('IInvoiceRepository') private readonly invoiceRepository: IInvoiceRepository,
  ) {}

  async execute(customerNumber?: string): Promise<EnergyDashboardDto> {
    return this.invoiceRepository.getEnergyDashboard(customerNumber);
  }
}
