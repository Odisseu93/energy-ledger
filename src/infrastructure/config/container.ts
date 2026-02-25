import 'reflect-metadata';
import { container } from 'tsyringe';

import { GeminiAdapter } from '@/infrastructure/llm/gemini.adapter';
import { PrismaInvoiceRepository } from '@/infrastructure/database/repositories/prisma-invoice.repository';
import { PrismaCustomerRepository } from '@/infrastructure/database/repositories/prisma-customer.repository';
import { ProcessInvoiceUseCase } from '@/application/use-cases/process-invoice.use-case';
import { ListInvoicesUseCase } from '@/application/use-cases/list-invoices.use-case';
import { GetEnergyDashboardUseCase } from '@/application/use-cases/get-energy-dashboard.use-case';
import { GetFinancialDashboardUseCase } from '@/application/use-cases/get-financial-dashboard.use-case';
import { InvoiceController } from '@/infrastructure/http/controllers/invoice.controller';
import { DashboardController } from '@/infrastructure/http/controllers/dashboard.controller';

// Infrastructure adapters
container.registerSingleton('ILLMAdapter', GeminiAdapter);
container.registerSingleton('IInvoiceRepository', PrismaInvoiceRepository);
container.registerSingleton('ICustomerRepository', PrismaCustomerRepository);

// Use cases
container.registerSingleton(ProcessInvoiceUseCase);
container.registerSingleton(ListInvoicesUseCase);
container.registerSingleton(GetEnergyDashboardUseCase);
container.registerSingleton(GetFinancialDashboardUseCase);

// Controllers
container.registerSingleton(InvoiceController);
container.registerSingleton(DashboardController);

export { container };
