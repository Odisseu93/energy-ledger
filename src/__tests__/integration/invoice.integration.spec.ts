import 'reflect-metadata';
import request from 'supertest';
import { container } from 'tsyringe';

import { app } from '@/app';
import { ProcessInvoiceUseCase } from '@/application/use-cases/process-invoice.use-case';
import { ListInvoicesUseCase } from '@/application/use-cases/list-invoices.use-case';
// Resolve the use cases from the container so we can spy on them
const makePdfBuffer = (): Buffer => Buffer.from('%PDF-fake-pdf-content-for-tests');

describe('POST /api/v1/invoices/upload', () => {
  let processInvoiceSpy: jest.SpyInstance;

  beforeEach(() => {
    const useCase = container.resolve(ProcessInvoiceUseCase);
    processInvoiceSpy = jest.spyOn(useCase, 'execute').mockResolvedValue({
      id: 'invoice-uuid',
      customerId: 'customer-uuid',
      customerNumber: '7202210726',
      referenceMonth: 'SET/2024',
      electricEnergyKwh: 50,
      electricEnergyValue: 38.63,
      sceeeEnergyKwh: 476,
      sceeeEnergyValue: 366.28,
      compensatedEnergyKwh: 476,
      compensatedEnergyValue: -354.11,
      publicLightingContrib: 49.43,
      energyConsumptionKwh: 526,
      totalValueWithoutGd: 454.34,
      gdSavings: -354.11,
      fileUrl: null,
      processedAt: new Date(),
    });
  });

  afterEach(() => {
    processInvoiceSpy.mockRestore();
  });

  it('should return 201 with a valid PDF buffer', async () => {
    const res = await request(app)
      .post('/api/v1/invoices/upload')
      .attach('invoice', makePdfBuffer(), {
        filename: 'invoice.pdf',
        contentType: 'application/pdf',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.customerNumber).toBe('7202210726');
  });

  it('should return 400 when no file is attached', async () => {
    const res = await request(app).post('/api/v1/invoices/upload');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should return 400 when file is not a PDF', async () => {
    const res = await request(app)
      .post('/api/v1/invoices/upload')
      .attach('invoice', Buffer.from('not-a-pdf'), {
        filename: 'image.png',
        contentType: 'image/png',
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe('GET /api/v1/invoices', () => {
  let listInvoicesSpy: jest.SpyInstance;

  beforeEach(() => {
    const useCase = container.resolve(ListInvoicesUseCase);
    listInvoicesSpy = jest.spyOn(useCase, 'execute').mockResolvedValue({
      data: [],
      total: 0,
      page: 1,
      limit: 20,
    });
  });

  afterEach(() => {
    listInvoicesSpy.mockRestore();
  });

  it('should return 200 with empty data', async () => {
    const res = await request(app).get('/api/v1/invoices');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([]);
  });

  it('should return 200 with customer_number filter', async () => {
    const res = await request(app).get('/api/v1/invoices?customer_number=7202210726');
    expect(res.status).toBe(200);
    expect(listInvoicesSpy).toHaveBeenCalledWith(
      expect.objectContaining({ customerNumber: '7202210726' }),
    );
  });

  it('should return 200 with reference_month filter', async () => {
    const res = await request(app).get('/api/v1/invoices?reference_month=SET%2F2024');
    expect(res.status).toBe(200);
    expect(listInvoicesSpy).toHaveBeenCalledWith(
      expect.objectContaining({ referenceMonth: 'SET/2024' }),
    );
  });
});

describe('GET /health', () => {
  it('should return 200 ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});
