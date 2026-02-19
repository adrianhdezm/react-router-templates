import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const files = pgTable('files', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull()
});

export const schema = {
  files
};
