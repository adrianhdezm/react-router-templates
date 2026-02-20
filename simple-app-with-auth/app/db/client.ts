import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import { envSchema } from '~/models/env.models';

import { schema } from './schema';

const { DATABASE_URL: databaseUrl } = envSchema.parse(process.env);

export const pool = new pg.Pool({ connectionString: databaseUrl });
export const db = drizzle(pool, { schema });
