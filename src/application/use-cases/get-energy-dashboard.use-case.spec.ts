import 'reflect-metadata';
import { GetEnergyDashboardUseCase } from './get-energy-dashboard.use-case';
import { IInvoiceRepository } from '@/domain/repositories/IInvoiceRepository';
import { EnergyDashboardDto } from '@/application/dtos/energy-dashboard.dto';

const makeRepositoryMock = (): jest.Mocked<IInvoiceRepository> => ({
  save: jest.fn(),
  list: jest.fn(),
  getEnergyDashboard: jest.fn(),
  getFinancialDashboard: jest.fn(),
});

const mockEnergyResult: EnergyDashboardDto = {
  customerNumber: '7202210726',
  data: [
    { referenceMonth: 'JUL/2024', energyConsumptionKwh: 1052, compensatedEnergyKwh: 952 },
    { referenceMonth: 'AGO/2024', energyConsumptionKwh: 978, compensatedEnergyKwh: 890 },
    { referenceMonth: 'SET/2024', energyConsumptionKwh: 526, compensatedEnergyKwh: 476 },
  ],
};

describe('GetEnergyDashboardUseCase', () => {
  let useCase: GetEnergyDashboardUseCase;
  let invoiceRepository: jest.Mocked<IInvoiceRepository>;

  beforeEach(() => {
    invoiceRepository = makeRepositoryMock();
    useCase = new GetEnergyDashboardUseCase(invoiceRepository);
  });

  it('should call getEnergyDashboard with the provided customerNumber', async () => {
    invoiceRepository.getEnergyDashboard.mockResolvedValue(mockEnergyResult);
    await useCase.execute('7202210726');
    expect(invoiceRepository.getEnergyDashboard).toHaveBeenCalledWith('7202210726');
  });

  it('should call getEnergyDashboard with undefined when no customerNumber is given', async () => {
    invoiceRepository.getEnergyDashboard.mockResolvedValue({ data: [] });
    await useCase.execute();
    expect(invoiceRepository.getEnergyDashboard).toHaveBeenCalledWith(undefined);
  });

  it('should return the result from the repository unchanged', async () => {
    invoiceRepository.getEnergyDashboard.mockResolvedValue(mockEnergyResult);
    const result = await useCase.execute('7202210726');
    expect(result).toBe(mockEnergyResult);
  });

  it('should return aggregated data for all customers when no filter is applied', async () => {
    const aggregated: EnergyDashboardDto = {
      data: [
        { referenceMonth: 'SET/2024', energyConsumptionKwh: 1578, compensatedEnergyKwh: 1428 },
      ],
    };
    invoiceRepository.getEnergyDashboard.mockResolvedValue(aggregated);
    const result = await useCase.execute();
    expect(result.customerNumber).toBeUndefined();
    expect(result.data).toHaveLength(1);
    expect(result.data[0].energyConsumptionKwh).toBe(1578);
  });

  it('should return an empty data array when no invoices are found', async () => {
    invoiceRepository.getEnergyDashboard.mockResolvedValue({
      customerNumber: '0000000000',
      data: [],
    });
    const result = await useCase.execute('0000000000');
    expect(result.data).toEqual([]);
  });
});
