/**
 * Raw data structure returned by the LLM after extracting fields from an invoice PDF.
 *
 * All field names are in English to match the JSON keys requested in the extraction prompt.
 */
export interface InvoiceLLMDataDto {
  customer_number: string;
  reference_month: string;
  electric_energy_kwh: number;
  electric_energy_value: number;
  sceee_energy_kwh: number;
  sceee_energy_value: number;
  compensated_energy_kwh: number;
  compensated_energy_value: number;
  public_lighting_contrib: number;
}
