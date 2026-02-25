import 'reflect-metadata';
import { GetFinancialDashboardUseCase } from './get-financial-dashboard.use-case';
import { IInvoiceRepository } from '@/domain/repositories/IInvoiceRepository';
import { FinancialDashboardDto } from '@/application/dtos/financial-dashboard.dto';

const makeRepositoryMock = (): jest.Mocked<IInvoiceRepository> => ({
  save: jest.fn(),
  list: jest.fn(),
  getEnergyDashboard: jest.fn(),
  getFinancialDashboard: jest.fn(),
});

const mockFinancialResult: FinancialDashboardDto = {
  customerNumber: '7202210726',
  data: [
    { referenceMonth: 'JUL/2024', totalValueWithoutGd: 908.68, gdSavings: -708.22 },
    { referenceMonth: 'AGO/2024', totalValueWithoutGd: 872.44, gdSavings: -660.5 },
    { referenceMonth: 'SET/2024', totalValueWithoutGd: 454.34, gdSavings: -354.11 },
  ],
};

describe('GetFinancialDashboardUseCase', () => {
  let useCase: GetFinancialDashboardUseCase;
  let invoiceRepository: jest.Mocked<IInvoiceRepository>;

  beforeEach(() => {
    invoiceRepository = makeRepositoryMock();
    useCase = new GetFinancialDashboardUseCase(invoiceRepository);
  });

  it('should call getFinancialDashboard with the provided customerNumber', async () => {
    invoiceRepository.getFinancialDashboard.mockResolvedValue(mockFinancialResult);
    await useCase.execute('7202210726');
    expect(invoiceRepository.getFinancialDashboard).toHaveBeenCalledWith('7202210726');
  });

  it('should call getFinancialDashboard with undefined when no customerNumber is given', async () => {
    invoiceRepository.getFinancialDashboard.mockResolvedValue({ data: [] });
    await useCase.execute();
    expect(invoiceRepository.getFinancialDashboard).toHaveBeenCalledWith(undefined);
  });

  it('should return the result from the repository unchanged', async () => {
    invoiceRepository.getFinancialDashboard.mockResolvedValue(mockFinancialResult);
    const result = await useCase.execute('7202210726');
    expect(result).toBe(mockFinancialResult);
  });

  it('should return aggregated data for all customers when no filter is applied', async () => {
    const aggregated: FinancialDashboardDto = {
      data: [{ referenceMonth: 'SET/2024', totalValueWithoutGd: 1362.78, gdSavings: -1062.33 }],
    };
    invoiceRepository.getFinancialDashboard.mockResolvedValue(aggregated);
    const result = await useCase.execute();
    expect(result.customerNumber).toBeUndefined();
    expect(result.data).toHaveLength(1);
    expect(result.data[0].totalValueWithoutGd).toBe(1362.78);
  });

  it('should preserve the negative sign of gdSavings', async () => {
    invoiceRepository.getFinancialDashboard.mockResolvedValue(mockFinancialResult);
    const result = await useCase.execute('7202210726');
    result.data.forEach((item) => {
      expect(item.gdSavings).toBeLessThan(0);
    });
  });

  it('should return an empty data array when no invoices are found', async () => {
    invoiceRepository.getFinancialDashboard.mockResolvedValue({
      customerNumber: '0000000000',
      data: [],
    });
    const result = await useCase.execute('0000000000');
    expect(result.data).toEqual([]);
  });
});
