import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url({ error: 'DATABASE_URL must be a valid postgres URL' }),
  BETTER_AUTH_SECRET: z.string({ error: 'BETTER_AUTH_SECRET is required' }).min(32, 'BETTER_AUTH_SECRET must be at least 32 characters'),
  BETTER_AUTH_URL: z.url({ error: 'BETTER_AUTH_URL must be a valid URL' })
});
