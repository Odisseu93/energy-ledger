/**
 * Raw data extracted from an invoice PDF by the LLM, before calculations.
 */
export interface InvoiceRawData {
  customerNumber: string;
  referenceMonth: string;
  electricEnergyKwh: number;
  electricEnergyValue: number;
  sceeeEnergyKwh: number;
  sceeeEnergyValue: number;
  compensatedEnergyKwh: number;
  compensatedEnergyValue: number;
  publicLightingContrib: number;
}

/**
 * Represents a processed energy invoice with both raw LLM-extracted data
 * and derived metrics calculated by the application.
 *
 * Calculated fields follow EnergyLedger's business rules:
 * - energyConsumptionKwh = electric + SCEEE energy
 * - totalValueWithoutGd  = electric + SCEEE + public lighting
 * - gdSavings            = compensated energy value (negative, stored as-is)
 */
export class InvoiceEntity {
  public readonly energyConsumptionKwh: number;
  public readonly totalValueWithoutGd: number;
  public readonly gdSavings: number;

  constructor(
    public readonly id: string,
    public readonly customerId: string,
    public readonly customerNumber: string,
    public readonly referenceMonth: string,
    public readonly electricEnergyKwh: number,
    public readonly electricEnergyValue: number,
    public readonly sceeeEnergyKwh: number,
    public readonly sceeeEnergyValue: number,
    public readonly compensatedEnergyKwh: number,
    public readonly compensatedEnergyValue: number,
    public readonly publicLightingContrib: number,
    public readonly fileUrl: string | null = null,
    public readonly processedAt: Date = new Date(),
  ) {
    this.energyConsumptionKwh = electricEnergyKwh + sceeeEnergyKwh;
    this.totalValueWithoutGd = electricEnergyValue + sceeeEnergyValue + publicLightingContrib;
    // Compensated energy value is stored as negative by the utility company;
    // we preserve the sign so dashboard queries can sum it directly.
    this.gdSavings = compensatedEnergyValue;
  }

  /**
   * Creates an InvoiceEntity from raw LLM data, generating a new ID.
   *
   * @param id - UUID for the new invoice record.
   * @param customerId - The ID of the persisted customer record.
   * @param raw - Unprocessed fields as returned by the LLM adapter.
   * @param fileUrl - Optional URL to the stored PDF file.
   */
  static fromRaw(
    id: string,
    customerId: string,
    raw: InvoiceRawData,
    fileUrl: string | null = null,
  ): InvoiceEntity {
    return new InvoiceEntity(
      id,
      customerId,
      raw.customerNumber,
      raw.referenceMonth,
      raw.electricEnergyKwh,
      raw.electricEnergyValue,
      raw.sceeeEnergyKwh,
      raw.sceeeEnergyValue,
      raw.compensatedEnergyKwh,
      raw.compensatedEnergyValue,
      raw.publicLightingContrib,
      fileUrl,
    );
  }
}
