import { Router } from 'express';
import { container } from 'tsyringe';

import { DashboardController } from '@/infrastructure/http/controllers/dashboard.controller';

const router = Router();
const controller = container.resolve(DashboardController);

router.get('/energy', controller.energy);
router.get('/financial', controller.financial);

export { router as dashboardRoutes };
