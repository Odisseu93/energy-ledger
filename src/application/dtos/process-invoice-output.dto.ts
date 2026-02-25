/** Output returned by the ProcessInvoiceUseCase after successfully processing an invoice. */
export interface ProcessInvoiceOutputDto {
  id: string;
  customerId: string;
  customerNumber: string;
  referenceMonth: string;
  electricEnergyKwh: number;
  electricEnergyValue: number;
  sceeeEnergyKwh: number;
  sceeeEnergyValue: number;
  compensatedEnergyKwh: number;
  compensatedEnergyValue: number;
  publicLightingContrib: number;
  energyConsumptionKwh: number;
  totalValueWithoutGd: number;
  gdSavings: number;
  fileUrl: string | null;
  processedAt: Date;
}
