import { InvoiceLLMDataDto } from '@/application/dtos/invoice-llm-data.dto';

/**
 * Contract for LLM adapters responsible for extracting structured data from invoice PDFs.
 *
 * Implementations must handle retries, response parsing and error wrapping internally.
 * The use case layer depends solely on this interface and must never reference a concrete adapter.
 */
export interface ILLMAdapter {
  extractInvoiceData(buffer: Buffer): Promise<InvoiceLLMDataDto>;
}
