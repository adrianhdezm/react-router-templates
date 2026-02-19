# AGENTS.md

## Project Overview

This project is a React Router v7 framework-mode app with:

- Custom Express server runtime (`server.ts`, `server/app.ts`)
- SSR enabled (`react-router.config.ts` sets `ssr: true`)
- Tailwind CSS v4 via Vite plugin (`@tailwindcss/vite`) and CSS-first setup in `app/app.css`
- shadcn/Base UI components (see `app/components/ui`)
- Strict TypeScript with route type generation

## Project Structure

- `app/`: React Router app code (routes, root document, components, styles)
- `app/routes/`: Route modules (page components, loaders/actions/meta)
- `app/components/`: Shared UI and feature components
- `app/lib/`: Shared utilities
- `public/`: Static assets served directly
- `server.ts`: Express runtime entrypoint (dev/prod bootstrapping)
- `server/`: Server integration with React Router request handling
- `react-router.config.ts`: React Router framework config
- `vite.config.ts`: Vite build/runtime plugin configuration
- `tsconfig*.json`: TypeScript project references and build configs

## Key Paths

- App shell and document: `app/root.tsx`
- Route config: `app/routes.ts`
- Route modules: `app/routes/**`
- Express entrypoint (dev/prod switch): `server.ts`
- React Router request handler + load context: `server/app.ts`
- Global styles/theme tokens: `app/app.css`
- Shared UI components: `app/components/**`
- Utilities: `app/lib/**`

## Coding Rules

- Keep route behavior in route modules (`loader`, `action`, `meta`, component).
- Use generated route types from `./+types/*` for route module args/props.
- When adding page metadata, use `meta({ loaderData })` patterns (not deprecated `data` usage).
- If server values are needed in loaders, pass them through `getLoadContext()` in `server/app.ts` and consume via `Route.LoaderArgs['context']`.
- Use `~/*` imports for app code (`~` maps to `app/*`).
- Prefer Tailwind utility classes and existing CSS variables in `app/app.css`; reuse `cn()` from `app/lib/utils.ts` for class merging.
- Preserve existing SSR behavior unless the task explicitly requests SPA-only changes.

## Quality Checks

Before finishing substantial code changes, run:

- `pnpm run typecheck`
- `pnpm run lint`

If formatting is needed, run:

- `pnpm run format`

## Commit Format

If asked to commit, follow `.github/commit-instructions.md`.
