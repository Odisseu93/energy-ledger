import 'reflect-metadata';
import request from 'supertest';
import { container } from 'tsyringe';

import { app } from '@/app';
import { GetEnergyDashboardUseCase } from '@/application/use-cases/get-energy-dashboard.use-case';
import { GetFinancialDashboardUseCase } from '@/application/use-cases/get-financial-dashboard.use-case';

const mockEnergyData = {
  customerNumber: undefined,
  data: [{ referenceMonth: 'SET/2024', energyConsumptionKwh: 526, compensatedEnergyKwh: 476 }],
};

const mockFinancialData = {
  customerNumber: undefined,
  data: [{ referenceMonth: 'SET/2024', totalValueWithoutGd: 454.34, gdSavings: -354.11 }],
};

describe('GET /api/v1/dashboard/energy', () => {
  let energySpy: jest.SpyInstance;

  beforeEach(() => {
    const useCase = container.resolve(GetEnergyDashboardUseCase);
    energySpy = jest.spyOn(useCase, 'execute').mockResolvedValue(mockEnergyData);
  });

  afterEach(() => energySpy.mockRestore());

  it('should return 200 with energy dashboard data', async () => {
    const res = await request(app).get('/api/v1/dashboard/energy');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.data).toHaveLength(1);
  });

  it('should pass customer_number to the use case', async () => {
    await request(app).get('/api/v1/dashboard/energy?customer_number=7202210726');
    expect(energySpy).toHaveBeenCalledWith('7202210726');
  });
});

describe('GET /api/v1/dashboard/financial', () => {
  let financialSpy: jest.SpyInstance;

  beforeEach(() => {
    const useCase = container.resolve(GetFinancialDashboardUseCase);
    financialSpy = jest.spyOn(useCase, 'execute').mockResolvedValue(mockFinancialData);
  });

  afterEach(() => financialSpy.mockRestore());

  it('should return 200 with financial dashboard data', async () => {
    const res = await request(app).get('/api/v1/dashboard/financial');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.data).toHaveLength(1);
  });

  it('should pass customer_number to the use case', async () => {
    await request(app).get('/api/v1/dashboard/financial?customer_number=7202210726');
    expect(financialSpy).toHaveBeenCalledWith('7202210726');
  });
});
