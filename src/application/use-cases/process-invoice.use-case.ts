import { randomUUID } from 'crypto';
import { inject, injectable } from 'tsyringe';

import { ILLMAdapter } from '@/domain/repositories/ILLMAdapter';
import { IInvoiceRepository } from '@/domain/repositories/IInvoiceRepository';
import { ICustomerRepository } from '@/domain/repositories/ICustomerRepository';
import { InvoiceEntity } from '@/domain/entities/invoice.entity';
import { ReferenceMonth } from '@/domain/value-objects/reference-month.vo';
import { ValidationError } from '@/shared/errors';
import { ProcessInvoiceInputDto } from '@/application/dtos/process-invoice-input.dto';
import { ProcessInvoiceOutputDto } from '@/application/dtos/process-invoice-output.dto';

/**
 * Processes an uploaded PDF invoice through the LLM pipeline and persists the result.
 *
 * Orchestrates: file validation → LLM extraction → field calculation → customer
 * upsert → invoice persistence.
 */
@injectable()
export class ProcessInvoiceUseCase {
  constructor(
    @inject('ILLMAdapter') private readonly llmAdapter: ILLMAdapter,
    @inject('IInvoiceRepository') private readonly invoiceRepository: IInvoiceRepository,
    @inject('ICustomerRepository') private readonly customerRepository: ICustomerRepository,
  ) {}

  async execute(input: ProcessInvoiceInputDto): Promise<ProcessInvoiceOutputDto> {
    this.validatePdf(input);

    const rawData = await this.llmAdapter.extractInvoiceData(input.buffer);

    // Validate the reference month format before persisting
    new ReferenceMonth(rawData.reference_month);

    const customer = await this.customerRepository.findOrCreateByNumber(rawData.customer_number);

    const invoice = InvoiceEntity.fromRaw(randomUUID(), customer.id, {
      customerNumber: rawData.customer_number,
      referenceMonth: rawData.reference_month,
      electricEnergyKwh: rawData.electric_energy_kwh,
      electricEnergyValue: rawData.electric_energy_value,
      sceeeEnergyKwh: rawData.sceee_energy_kwh,
      sceeeEnergyValue: rawData.sceee_energy_value,
      compensatedEnergyKwh: rawData.compensated_energy_kwh,
      compensatedEnergyValue: rawData.compensated_energy_value,
      publicLightingContrib: rawData.public_lighting_contrib,
    });

    await this.invoiceRepository.save(invoice);

    return this.toOutput(invoice);
  }

  private validatePdf(input: ProcessInvoiceInputDto): void {
    if (!input.buffer || input.buffer.length === 0) {
      throw new ValidationError('No file provided');
    }

    if (input.mimetype && input.mimetype !== 'application/pdf') {
      throw new ValidationError(
        `Invalid file type: "${input.mimetype}". Only PDF files are accepted.`,
      );
    }

    // Check PDF magic bytes (%PDF-) when mimetype is not provided
    const pdfMagic = Buffer.from('%PDF-');
    if (!input.mimetype && !input.buffer.slice(0, 5).equals(pdfMagic)) {
      throw new ValidationError('Invalid file: not a valid PDF document.');
    }
  }

  private toOutput(invoice: InvoiceEntity): ProcessInvoiceOutputDto {
    return {
      id: invoice.id,
      customerId: invoice.customerId,
      customerNumber: invoice.customerNumber,
      referenceMonth: invoice.referenceMonth,
      electricEnergyKwh: invoice.electricEnergyKwh,
      electricEnergyValue: invoice.electricEnergyValue,
      sceeeEnergyKwh: invoice.sceeeEnergyKwh,
      sceeeEnergyValue: invoice.sceeeEnergyValue,
      compensatedEnergyKwh: invoice.compensatedEnergyKwh,
      compensatedEnergyValue: invoice.compensatedEnergyValue,
      publicLightingContrib: invoice.publicLightingContrib,
      energyConsumptionKwh: invoice.energyConsumptionKwh,
      totalValueWithoutGd: invoice.totalValueWithoutGd,
      gdSavings: invoice.gdSavings,
      fileUrl: invoice.fileUrl,
      processedAt: invoice.processedAt,
    };
  }
}
