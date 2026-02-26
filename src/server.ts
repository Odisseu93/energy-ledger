import { app } from './app';
import { env } from '@/infrastructure/config/env';
import { logger } from '@/shared/logger/logger';
import { prisma } from '@/infrastructure/database/prisma/prisma-client';

async function bootstrap(): Promise<void> {
  // Prisma connects lazily on the first query — explicit $connect() is not
  // required and can cause startup failures on cold Neon free-tier instances.
  const server = app.listen(env.PORT, '0.0.0.0', () => {
    logger.info({ port: env.PORT, env: env.NODE_ENV }, 'Server started');
  });

  const shutdown = async (signal: string): Promise<void> => {
    logger.info({ signal }, 'Shutting down gracefully...');
    server.close(async () => {
      await prisma.$disconnect();
      logger.info('Server closed');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => void shutdown('SIGTERM'));
  process.on('SIGINT', () => void shutdown('SIGINT'));
}

bootstrap().catch((err) => {
  logger.error({ err }, 'Failed to start server');
  process.exit(1);
});
