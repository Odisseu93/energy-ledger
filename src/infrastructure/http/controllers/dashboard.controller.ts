import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { z } from 'zod';

import { GetEnergyDashboardUseCase } from '@/application/use-cases/get-energy-dashboard.use-case';
import { GetFinancialDashboardUseCase } from '@/application/use-cases/get-financial-dashboard.use-case';
import { ValidationError } from '@/shared/errors';

const dashboardQuerySchema = z.object({
  customer_number: z.string().optional(),
});

@injectable()
export class DashboardController {
  constructor(
    @inject(GetEnergyDashboardUseCase)
    private readonly getEnergyDashboard: GetEnergyDashboardUseCase,
    @inject(GetFinancialDashboardUseCase)
    private readonly getFinancialDashboard: GetFinancialDashboardUseCase,
  ) {}

  energy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = dashboardQuerySchema.safeParse(req.query);
      if (!query.success) {
        throw new ValidationError(
          `Invalid query parameters: ${JSON.stringify(query.error.flatten((i) => i.message).fieldErrors)}`,
        );
      }

      const result = await this.getEnergyDashboard.execute(query.data.customer_number);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };

  financial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = dashboardQuerySchema.safeParse(req.query);
      if (!query.success) {
        throw new ValidationError(
          `Invalid query parameters: ${JSON.stringify(query.error.flatten((i) => i.message).fieldErrors)}`,
        );
      }

      const result = await this.getFinancialDashboard.execute(query.data.customer_number);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  };
}
