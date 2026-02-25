/** Single data point for the energy dashboard, grouped by reference month. */
export interface EnergyDashboardItemDto {
  referenceMonth: string;
  energyConsumptionKwh: number;
  compensatedEnergyKwh: number;
}

/** Full response for the energy dashboard endpoint. */
export interface EnergyDashboardDto {
  customerNumber?: string;
  data: EnergyDashboardItemDto[];
}
