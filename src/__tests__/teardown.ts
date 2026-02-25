import { prisma } from '@/infrastructure/database/prisma/prisma-client';

export default async function globalTeardown(): Promise<void> {
  await prisma.$disconnect();
}
