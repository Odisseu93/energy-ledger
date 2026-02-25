import 'reflect-metadata';
import { ListInvoicesUseCase } from './list-invoices.use-case';
import { IInvoiceRepository } from '@/domain/repositories/IInvoiceRepository';
import { InvoiceEntity } from '@/domain/entities/invoice.entity';

const makeInvoiceEntity = (): InvoiceEntity =>
  new InvoiceEntity(
    'invoice-uuid',
    'customer-uuid',
    '7202210726',
    'SET/2024',
    50,
    38.63,
    476,
    366.28,
    476,
    -354.11,
    49.43,
  );

const makeRepositoryMock = (): jest.Mocked<IInvoiceRepository> => ({
  save: jest.fn(),
  list: jest.fn(),
  getEnergyDashboard: jest.fn(),
  getFinancialDashboard: jest.fn(),
});

describe('ListInvoicesUseCase', () => {
  let useCase: ListInvoicesUseCase;
  let invoiceRepository: jest.Mocked<IInvoiceRepository>;

  beforeEach(() => {
    invoiceRepository = makeRepositoryMock();
    useCase = new ListInvoicesUseCase(invoiceRepository);
  });

  describe('pagination defaults', () => {
    it('should default page to 1 when not provided', async () => {
      invoiceRepository.list.mockResolvedValue({ data: [], total: 0 });
      const result = await useCase.execute({});
      expect(result.page).toBe(1);
      expect(invoiceRepository.list).toHaveBeenCalledWith(expect.objectContaining({ page: 1 }));
    });

    it('should default limit to 20 when not provided', async () => {
      invoiceRepository.list.mockResolvedValue({ data: [], total: 0 });
      const result = await useCase.execute({});
      expect(result.limit).toBe(20);
      expect(invoiceRepository.list).toHaveBeenCalledWith(expect.objectContaining({ limit: 20 }));
    });

    it('should use provided page and limit', async () => {
      invoiceRepository.list.mockResolvedValue({ data: [], total: 0 });
      const result = await useCase.execute({ page: 3, limit: 10 });
      expect(result.page).toBe(3);
      expect(result.limit).toBe(10);
    });
  });

  describe('filters', () => {
    it('should forward customerNumber filter to the repository', async () => {
      invoiceRepository.list.mockResolvedValue({ data: [], total: 0 });
      await useCase.execute({ customerNumber: '7202210726' });
      expect(invoiceRepository.list).toHaveBeenCalledWith(
        expect.objectContaining({ customerNumber: '7202210726' }),
      );
    });

    it('should forward referenceMonth filter to the repository', async () => {
      invoiceRepository.list.mockResolvedValue({ data: [], total: 0 });
      await useCase.execute({ referenceMonth: 'SET/2024' });
      expect(invoiceRepository.list).toHaveBeenCalledWith(
        expect.objectContaining({ referenceMonth: 'SET/2024' }),
      );
    });
  });

  describe('output mapping', () => {
    it('should return total from the repository', async () => {
      invoiceRepository.list.mockResolvedValue({ data: [], total: 42 });
      const result = await useCase.execute({});
      expect(result.total).toBe(42);
    });

    it('should map InvoiceEntity fields to output DTO correctly', async () => {
      const entity = makeInvoiceEntity();
      invoiceRepository.list.mockResolvedValue({ data: [entity], total: 1 });
      const result = await useCase.execute({});
      const dto = result.data[0];

      expect(dto.id).toBe(entity.id);
      expect(dto.customerId).toBe(entity.customerId);
      expect(dto.customerNumber).toBe(entity.customerNumber);
      expect(dto.referenceMonth).toBe(entity.referenceMonth);
      expect(dto.electricEnergyKwh).toBe(entity.electricEnergyKwh);
      expect(dto.sceeeEnergyKwh).toBe(entity.sceeeEnergyKwh);
      expect(dto.energyConsumptionKwh).toBe(entity.energyConsumptionKwh);
      expect(dto.totalValueWithoutGd).toBeCloseTo(entity.totalValueWithoutGd);
      expect(dto.gdSavings).toBe(entity.gdSavings);
      expect(dto.fileUrl).toBeNull();
    });

    it('should return an empty data array when repository returns no results', async () => {
      invoiceRepository.list.mockResolvedValue({ data: [], total: 0 });
      const result = await useCase.execute({});
      expect(result.data).toEqual([]);
      expect(result.total).toBe(0);
    });
  });
});
