import 'reflect-metadata';
import '@/infrastructure/config/container';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { apiV1Router } from '@/infrastructure/http/routes';
import { errorHandler } from '@/infrastructure/http/middlewares/error-handler.middleware';
import { requestLogger } from '@/infrastructure/http/middlewares/request-logger.middleware';
import { openApiSpec } from '@/infrastructure/http/swagger/openapi';
import { docsHtml } from '@/infrastructure/http/docs/docs-page';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/v1', apiV1Router);

app.get('/docs', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(docsHtml);
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use(errorHandler);

export { app };
