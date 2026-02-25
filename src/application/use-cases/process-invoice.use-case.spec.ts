import 'reflect-metadata';
import { ProcessInvoiceUseCase } from './process-invoice.use-case';
import { ILLMAdapter } from '@/domain/repositories/ILLMAdapter';
import { IInvoiceRepository } from '@/domain/repositories/IInvoiceRepository';
import { ICustomerRepository } from '@/domain/repositories/ICustomerRepository';
import { CustomerEntity } from '@/domain/entities/customer.entity';
import { makeLLMResponseMock } from '@//__tests__/factories/llm-response.factory';
import { ValidationError, LLMError } from '@/shared/errors';

const makeMocks = () => {
  const llmAdapter: jest.Mocked<ILLMAdapter> = {
    extractInvoiceData: jest.fn(),
  };

  const invoiceRepository: jest.Mocked<IInvoiceRepository> = {
    save: jest.fn(),
    list: jest.fn(),
    getEnergyDashboard: jest.fn(),
    getFinancialDashboard: jest.fn(),
  };

  const customerRepository: jest.Mocked<ICustomerRepository> = {
    findOrCreateByNumber: jest.fn(),
    findByNumber: jest.fn(),
  };

  return { llmAdapter, invoiceRepository, customerRepository };
};

const makePdfBuffer = () => Buffer.from('%PDF-fake-content');

describe('ProcessInvoiceUseCase', () => {
  let useCase: ProcessInvoiceUseCase;
  let llmAdapter: jest.Mocked<ILLMAdapter>;
  let invoiceRepository: jest.Mocked<IInvoiceRepository>;
  let customerRepository: jest.Mocked<ICustomerRepository>;

  beforeEach(() => {
    const mocks = makeMocks();
    llmAdapter = mocks.llmAdapter;
    invoiceRepository = mocks.invoiceRepository;
    customerRepository = mocks.customerRepository;
    useCase = new ProcessInvoiceUseCase(llmAdapter, invoiceRepository, customerRepository);
  });

  describe('execute – success', () => {
    beforeEach(() => {
      llmAdapter.extractInvoiceData.mockResolvedValue(makeLLMResponseMock());
      customerRepository.findOrCreateByNumber.mockResolvedValue(
        new CustomerEntity('customer-uuid', '7202210726'),
      );
      invoiceRepository.save.mockResolvedValue(undefined);
    });

    it('should return a result with correct energyConsumptionKwh', async () => {
      const result = await useCase.execute({
        buffer: makePdfBuffer(),
        mimetype: 'application/pdf',
      });
      expect(result.energyConsumptionKwh).toBeCloseTo(526); // 50 + 476
    });

    it('should return a result with correct totalValueWithoutGd', async () => {
      const result = await useCase.execute({
        buffer: makePdfBuffer(),
        mimetype: 'application/pdf',
      });
      expect(result.totalValueWithoutGd).toBeCloseTo(454.34); // 38.63 + 366.28 + 49.43
    });

    it('should return a result with correct gdSavings', async () => {
      const result = await useCase.execute({
        buffer: makePdfBuffer(),
        mimetype: 'application/pdf',
      });
      expect(result.gdSavings).toBeCloseTo(-354.11);
    });

    it('should call invoiceRepository.save once', async () => {
      await useCase.execute({ buffer: makePdfBuffer(), mimetype: 'application/pdf' });
      expect(invoiceRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should call customerRepository.findOrCreateByNumber with the extracted customer number', async () => {
      await useCase.execute({ buffer: makePdfBuffer(), mimetype: 'application/pdf' });
      expect(customerRepository.findOrCreateByNumber).toHaveBeenCalledWith('7202210726');
    });
  });

  describe('execute – validation errors', () => {
    it('should throw ValidationError when buffer is empty', async () => {
      await expect(
        useCase.execute({ buffer: Buffer.alloc(0), mimetype: 'application/pdf' }),
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError when mimetype is not PDF', async () => {
      await expect(
        useCase.execute({ buffer: makePdfBuffer(), mimetype: 'image/png' }),
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('execute – LLM errors', () => {
    it('should propagate LLMError thrown by the adapter', async () => {
      llmAdapter.extractInvoiceData.mockRejectedValue(new LLMError('Gemini API timeout'));
      await expect(
        useCase.execute({ buffer: makePdfBuffer(), mimetype: 'application/pdf' }),
      ).rejects.toThrow(LLMError);
    });
  });
});
