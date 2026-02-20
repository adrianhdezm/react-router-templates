# AGENTS.md

## Project Overview

This project is a React Router v7 framework-mode app with:

- Custom Express server runtime (`server.ts`, `server/app.ts`)
- SSR enabled (`react-router.config.ts` sets `ssr: true`)
- Tailwind CSS v4 via Vite plugin (`@tailwindcss/vite`) and CSS-first setup in `app/app.css`
- shadcn/Base UI components (see `app/components/ui`)
- PostgreSQL database access via Drizzle ORM
- Drizzle Kit migrations (`drizzle.config.ts`, `db/migrations`)
- Better Auth email/password authentication
- Strict TypeScript with route type generation

## Project Structure

- `app/`: React Router app code (routes, root document, components, styles)
- `app/db/`: Drizzle schema and request-scoped DB accessor
- `app/db/auth-schema.ts`: Generated Better Auth Drizzle schema
- `app/routes/*.tsx`: Route modules (page components, loaders/actions/meta)
- `app/layouts/*.tsx`: Layout route modules
- `app/components/`: Shared UI and feature components
- `app/lib/`: Shared utilities
- `db/migrations/`: Generated SQL migrations managed by Drizzle Kit
- `db/scripts/`: Postgres bootstrap SQL used by Docker initialization
- `public/`: Static assets served directly
- `server.ts`: Express runtime entrypoint (dev/prod bootstrapping)
- `server/`: Server integration with React Router request handling
- `react-router.config.ts`: React Router framework config
- `vite.config.ts`: Vite build/runtime plugin configuration
- `drizzle.config.ts`: Drizzle Kit configuration for schema + migrations
- `docker-compose.yml`: Local Postgres service definition
- `tsconfig*.json`: TypeScript project references and build configs

## Key Paths

- App shell and document: `app/root.tsx`
- Route config: `app/routes.ts`
- Route modules: `app/routes/*.tsx`, `app/layouts/*.tsx`
- Drizzle schema definitions: `app/db/schema.ts`
- Better Auth config: `app/lib/auth.ts`
- DB context accessor: `app/db/context.ts`
- Express entrypoint (dev/prod switch): `server.ts`
- React Router request handler + DB wiring + load context: `server/app.ts`
- Global styles/theme tokens: `app/app.css`
- Shared UI components: `app/components/**`
- Utilities: `app/lib/**`

## Coding Rules

- Keep route behavior in route modules (`loader`, `action`, `meta`, component).
- Use generated route types from `./+types/*` for route module args/props.
- When adding page metadata, use `meta({ loaderData })` patterns (not deprecated `data` usage).
- If server values are needed in loaders, pass them through `getLoadContext()` in `server/app.ts` and consume via `Route.LoaderArgs['context']`.
- In route modules, access Better Auth through `context.auth` (`Route.LoaderArgs` / `Route.ActionArgs`) and avoid direct `~/lib/auth` imports in routes.
- For app UI, prefer shadcn/Base UI primitives from `app/components/ui`; add missing primitives with `pnpm dlx shadcn@latest add <component>`.
- Access the database through `database()` from `app/db/context.ts`; do not create ad-hoc DB clients inside routes.
- Keep table definitions in `app/db/schema.ts` and export them via the `schema` object for typed Drizzle access.
- When schema changes are made, run `pnpm run db:generate`, review the generated SQL in `db/migrations`, then run `pnpm run db:migrate`.
- For Better Auth schema updates, run `pnpm run auth:generate`, then regenerate Drizzle SQL with `pnpm run db:generate`.
- Keep environment validation in `app/models/env.models.ts` in sync with DB and auth environment variables.
- Use `~/*` imports for app code (`~` maps to `app/*`).
- Prefer Tailwind utility classes and existing CSS variables in `app/app.css`; reuse `cn()` from `app/lib/utils.ts` for class merging.
- Preserve existing SSR behavior unless the task explicitly requests SPA-only changes.

## Quality Checks

Before finishing substantial code changes, run:

- `pnpm run typecheck`
- `pnpm run lint`
- If schema changed: `pnpm run db:generate` and `pnpm run db:migrate`

If formatting is needed, run:

- `pnpm run format`

## Commit Format

If asked to commit, follow `.github/commit-instructions.md`.
