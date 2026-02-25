import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { z } from 'zod';

import { ProcessInvoiceUseCase } from '@/application/use-cases/process-invoice.use-case';
import { ListInvoicesUseCase } from '@/application/use-cases/list-invoices.use-case';
import { ValidationError } from '@/shared/errors';

const listQuerySchema = z.object({
  customer_number: z.string().optional(),
  reference_month: z.string().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().max(100).optional(),
});

@injectable()
export class InvoiceController {
  constructor(
    @inject(ProcessInvoiceUseCase) private readonly processInvoice: ProcessInvoiceUseCase,
    @inject(ListInvoicesUseCase) private readonly listInvoices: ListInvoicesUseCase,
  ) {}

  upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        throw new ValidationError('PDF file is required');
      }

      const result = await this.processInvoice.execute({
        buffer: req.file.buffer,
        mimetype: req.file.mimetype,
        originalName: req.file.originalname,
      });

      res.status(201).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = listQuerySchema.safeParse(req.query);
      if (!query.success) {
        throw new ValidationError(
          `Invalid query parameters: ${JSON.stringify(query.error.flatten((i) => i.message).fieldErrors)}`,
        );
      }

      const result = await this.listInvoices.execute({
        customerNumber: query.data.customer_number,
        referenceMonth: query.data.reference_month,
        page: query.data.page,
        limit: query.data.limit,
      });

      res.status(200).json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  };
}
