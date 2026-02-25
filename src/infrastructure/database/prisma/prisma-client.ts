import { PrismaClient } from '@prisma/client';

/**
 * Singleton PrismaClient instance.
 *
 * Reuses the global instance in development to prevent exhausting the
 * connection pool due to hot-reloading with ts-node.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
