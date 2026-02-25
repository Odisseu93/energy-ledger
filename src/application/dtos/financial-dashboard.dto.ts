/** Single data point for the financial dashboard, grouped by reference month. */
export interface FinancialDashboardItemDto {
  referenceMonth: string;
  totalValueWithoutGd: number;
  gdSavings: number;
}

/** Full response for the financial dashboard endpoint. */
export interface FinancialDashboardDto {
  customerNumber?: string;
  data: FinancialDashboardItemDto[];
}
