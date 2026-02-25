import { z } from 'zod';

// Load .env file — dotenv.config is called in server.ts/jest setup; this import
// is intentionally deferred to avoid double-loading in test environments.
import 'dotenv/config';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  GEMINI_API_KEY: z.string().min(1, 'GEMINI_API_KEY is required'),
  UPLOAD_MAX_SIZE_MB: z.coerce.number().int().positive().default(10),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    process.exit(1);
  }
  // In test environment, provide defaults so tests don't crash on startup
  process.env.DATABASE_URL =
    process.env.DATABASE_URL ??
    'postgresql://energy_ledger:energy_ledger_secret@localhost:5432/energy_ledger_test_db';
  process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? 'test-key';
}

const finalParsed = envSchema.parse(process.env);

export const env = finalParsed;
