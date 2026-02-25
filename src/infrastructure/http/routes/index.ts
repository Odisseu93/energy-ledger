import { Router } from 'express';
import { invoiceRoutes } from './invoice.routes';
import { dashboardRoutes } from './dashboard.routes';

const router = Router();

router.use('/invoices', invoiceRoutes);
router.use('/dashboard', dashboardRoutes);

export { router as apiV1Router };
