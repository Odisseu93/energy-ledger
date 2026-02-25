/** Query filters for the invoice listing endpoint. */
export interface InvoiceFiltersDto {
  customerNumber?: string;
  referenceMonth?: string;
  page?: number;
  limit?: number;
}
