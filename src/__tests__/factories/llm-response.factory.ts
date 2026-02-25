import { InvoiceLLMDataDto } from '@/application/dtos/invoice-llm-data.dto';

/**
 * Returns a realistic mock of the LLM extraction response.
 *
 * Based on the sample invoice provided in docs/faturas/.
 */
export const makeLLMResponseMock = (
  overrides: Partial<InvoiceLLMDataDto> = {},
): InvoiceLLMDataDto => ({
  customer_number: '7202210726',
  reference_month: 'SET/2024',
  electric_energy_kwh: 50,
  electric_energy_value: 38.63,
  sceee_energy_kwh: 476,
  sceee_energy_value: 366.28,
  compensated_energy_kwh: 476,
  compensated_energy_value: -354.11,
  public_lighting_contrib: 49.43,
  ...overrides,
});
