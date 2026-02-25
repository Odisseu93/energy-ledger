import { z } from 'zod';

/**
 * Zod schema that validates the JSON structure returned by the LLM.
 *
 * All numeric fields default to 0 if missing, matching the prompt instruction.
 */
export const invoiceLLMDataSchema = z.object({
  customer_number: z.string().min(1),
  reference_month: z.string().min(1),
  electric_energy_kwh: z.number().default(0),
  electric_energy_value: z.number().default(0),
  sceee_energy_kwh: z.number().default(0),
  sceee_energy_value: z.number().default(0),
  compensated_energy_kwh: z.number().default(0),
  compensated_energy_value: z.number().default(0),
  public_lighting_contrib: z.number().default(0),
});
