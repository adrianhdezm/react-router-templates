import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.url({ error: 'DATABASE_URL must be a valid postgres URL' })
});
