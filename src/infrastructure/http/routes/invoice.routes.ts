import { Router } from 'express';
import { container } from 'tsyringe';

import { InvoiceController } from '@/infrastructure/http/controllers/invoice.controller';
import { uploadMiddleware } from '@/infrastructure/http/middlewares/upload.middleware';

const router = Router();
const controller = container.resolve(InvoiceController);

router.post('/upload', uploadMiddleware.single('invoice'), controller.upload);
router.get('/', controller.list);

export { router as invoiceRoutes };
