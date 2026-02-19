import { createRequestHandler } from '@react-router/express';
import { drizzle } from 'drizzle-orm/node-postgres';
import express from 'express';
import pg from 'pg';
import 'react-router';

import { DatabaseContext } from '~/db/context';
import { schema } from '~/db/schema';
import { envSchema } from '~/models/env.models';

declare module 'react-router' {
  interface AppLoadContext {
    APP_NAME: string;
  }
}

export const app = express();

const { DATABASE_URL: databaseUrl } = envSchema.parse(process.env);
const pool = new pg.Pool({ connectionString: databaseUrl });
const db = drizzle(pool, { schema });
app.use((_, __, next) => DatabaseContext.run(db, next));

app.use(
  createRequestHandler({
    build: () => import('virtual:react-router/server-build'),
    getLoadContext() {
      return {
        APP_NAME: 'Simple App with DB'
      };
    }
  })
);
