/** Input for the ProcessInvoiceUseCase. */
export interface ProcessInvoiceInputDto {
  buffer: Buffer;
  mimetype?: string;
  originalName?: string;
}
