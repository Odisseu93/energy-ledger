import { InvoiceEntity } from '@/domain/entities/invoice.entity';
import { InvoiceFiltersDto } from '@/application/dtos/invoice-filters.dto';
import { EnergyDashboardDto } from '@/application/dtos/energy-dashboard.dto';
import { FinancialDashboardDto } from '@/application/dtos/financial-dashboard.dto';

/**
 * Port for invoice persistence operations.
 *
 * Implementations live in the infrastructure layer and must never be
 * imported directly by use cases — only this interface may be used.
 */
export interface IInvoiceRepository {
  save(invoice: InvoiceEntity): Promise<void>;
  list(filters: InvoiceFiltersDto): Promise<{ data: InvoiceEntity[]; total: number }>;
  getEnergyDashboard(customerNumber?: string): Promise<EnergyDashboardDto>;
  getFinancialDashboard(customerNumber?: string): Promise<FinancialDashboardDto>;
}
