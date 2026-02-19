import { createRequestHandler } from '@react-router/express';
import express from 'express';
import 'react-router';

declare module 'react-router' {
  interface AppLoadContext {
    APP_NAME: string;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    build: () => import('virtual:react-router/server-build'),
    getLoadContext() {
      return {
        APP_NAME: 'Simple App'
      };
    }
  })
);
