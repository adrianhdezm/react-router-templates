import { createRequestHandler } from '@react-router/express';
import express from 'express';
import 'react-router';

import { APP_NAME } from '~/constants';
import { db } from '~/db/client';
import { DatabaseContext } from '~/db/context';
import { auth } from '~/lib/auth';

declare module 'react-router' {
  interface AppLoadContext {
    APP_NAME: string;
    auth: typeof auth;
  }
}

export const app = express();

app.use((_, __, next) => DatabaseContext.run(db, next));

app.use(
  createRequestHandler({
    build: () => import('virtual:react-router/server-build'),
    getLoadContext() {
      return {
        APP_NAME,
        auth
      };
    }
  })
);
