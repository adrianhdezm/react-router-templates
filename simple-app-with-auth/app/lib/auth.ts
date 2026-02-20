import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { APP_NAME } from '../constants';
import { db } from '../db/client';
import { schema } from '../db/schema';
import { envSchema } from '../models/env.models';

const { BETTER_AUTH_SECRET: secret, BETTER_AUTH_URL: baseURL } = envSchema.parse(process.env);

export const auth = betterAuth({
  appName: APP_NAME,
  secret,
  baseURL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
      user: schema.users,
      session: schema.sessions,
      verification: schema.verifications,
      account: schema.accounts
    }
  }),
  advanced: {
    cookiePrefix: 'App',
    database: {
      generateId: 'uuid'
    }
  },
  emailAndPassword: {
    enabled: true
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  }
});
