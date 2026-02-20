# starter-app-with-auth

This is a React Router framework-mode starter with a custom Express server, PostgreSQL, Drizzle ORM, and Better Auth.

## Stack

- React Router v7 (framework mode, SSR)
- Express runtime (`server.ts`, `server/app.ts`)
- PostgreSQL (via `docker-compose.yml`)
- Drizzle ORM + Drizzle Kit migrations
- Better Auth (email/password authentication)

## Authentication

- Better Auth server config: `app/lib/auth.ts`
- Better Auth handler mounted through React Router route module: `app/routes/auth.ts` on `/api/auth/*`
- Auth-aware route handlers: route modules call `context.auth.api.*` directly
- Auth tables are generated in `app/db/auth-schema.ts` and re-exported from `app/db/schema.ts`

Included pages:

- `/login`: Email/password login
- `/register`: User registration
- `/profile`: Authenticated profile page
- `/`: Authenticated home page with sidebar and bottom user section (profile + logout)

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
- `pnpm run auth:generate`: Generate Better Auth Drizzle schema file.
- `pnpm run db:generate`: Generate Drizzle migration files from schema changes.
- `pnpm run db:migrate`: Apply migrations to the configured database.

## Local Development

1. Create `.env` with:
   - `DATABASE_URL=postgres://postgres:s3cr3t@localhost:5432/app`
   - `BETTER_AUTH_SECRET=<32+ character secret>`
   - `BETTER_AUTH_URL=http://localhost:3000`
2. Start Postgres: `docker compose up -d db`.
3. Apply migrations: `pnpm run db:migrate`.
4. Start the app: `pnpm run dev`.

## Environment

- `DATABASE_URL` (required): validated in `app/models/env.models.ts`.
- `BETTER_AUTH_SECRET` (required, minimum 32 chars): Better Auth signing/encryption secret.
- `BETTER_AUTH_URL` (required): Better Auth base URL, e.g. `http://localhost:3000`.
- `NODE_ENV`: used to switch dev/prod runtime behavior.
