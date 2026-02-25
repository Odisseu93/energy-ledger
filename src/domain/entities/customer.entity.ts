/**
 * Represents a utility customer identified by their customer number.
 *
 * A customer may have multiple invoices over time.
 */
export class CustomerEntity {
  constructor(
    public readonly id: string,
    public readonly customerNumber: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
