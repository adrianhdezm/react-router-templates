# starter-app-with-db

This is a React Router framework-mode starter with a custom Express server, PostgreSQL, and Drizzle ORM.

## Stack

- React Router v7 (framework mode, SSR)
- Express runtime (`server.ts`, `server/app.ts`)
- PostgreSQL (via `docker-compose.yml`)
- Drizzle ORM + Drizzle Kit migrations

## Database + Drizzle

- Drizzle schema is defined in `app/db/schema.ts`.
- Database client is created in `server/app.ts` with `drizzle(pool, { schema })`.
- Request-scoped DB access is provided by `app/db/context.ts` using `AsyncLocalStorage`.
- Drizzle Kit config lives in `drizzle.config.ts`.
- SQL migrations are stored in `db/migrations`.

## Scripts

- `pnpm run dev`: Start the development server.
- `pnpm run start`: Start the production server.
- `pnpm run typecheck`: Run TypeScript type checking.
- `pnpm run lint`: Run ESLint.
- `pnpm run format`: Format the code using Prettier.
- `pnpm run db:generate`: Generate Drizzle migration files from schema changes.
- `pnpm run db:migrate`: Apply migrations to the configured database.

## Local Development

1. Ensure `.env` contains a valid `DATABASE_URL`.
2. Start Postgres: `docker compose up -d db`.
3. Apply migrations: `pnpm run db:migrate`.
4. Start the app: `pnpm run dev`.

## Environment

- `DATABASE_URL` (required): validated in `app/models/env.models.ts`.
- `NODE_ENV`: used to switch dev/prod runtime behavior.
