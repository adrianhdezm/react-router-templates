import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AsyncLocalStorage } from 'node:async_hooks';

import { schema } from '~/db/schema';

export const DatabaseContext = new AsyncLocalStorage<NodePgDatabase<typeof schema>>();

export function database() {
  const db = DatabaseContext.getStore();
  if (!db) {
    throw new Error('DatabaseContext not set');
  }
  return db;
}
