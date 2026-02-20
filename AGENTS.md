# AGENTS.md

Agent guide for the `react-router-templates` monorepo.

## Repository Purpose

This repository contains React Router templates apps intended to be used with `create-react-router`.

- `simple-app`: React Router + Express + SSR
- `simple-app-with-db`: React Router + Express + SSR + PostgreSQL (Drizzle ORM)

## Working Model

- This is a `pnpm` workspace, not a single deployable app.
- Most work happens inside one template directory at a time.
- Root provides workspace-wide checks:
  - `pnpm lint`
  - `pnpm format`
  - `pnpm typecheck`

## Workspace Layout

- `simple-app/`: base template
- `simple-app-with-db/`: database template

## Setup

From repo root:

1. `pnpm install`
2. Run a template in dev mode:
   - `pnpm --filter simple-app dev`
   - `pnpm --filter simple-app-with-db dev`

For DB template local database:

1. `cd simple-app-with-db`
2. `docker compose up -d`
3. `pnpm db:migrate`

## Common Agent Commands

Run checks for all templates from root:

- `pnpm typecheck`
- `pnpm lint`
- `pnpm format`

## Change Guardrails

- Keep changes scoped to the target template unless the task is explicitly cross-template.
- If a non-DB behavior change applies to both templates, update both or document why only one changed.
- Preserve React Router framework mode + SSR unless requested otherwise.
- Do not commit secrets or `.env` files.
- Avoid unnecessary lockfile churn; update dependencies only when needed.

## Validation Expectations

Before finishing substantial edits:

- Prefer root scripts to validate all templates:
  - `pnpm typecheck`
  - `pnpm lint`
- If only one template changed and time is constrained, run filtered checks (i.e., `pnpm --filter <template> typecheck` and `pnpm --filter <template> lint`) for that template.
- If DB schema changed, also run `db:generate` and `db:migrate` for `simple-app-with-db`.

## Commit Format

If asked to commit, follow `.github/commit-instructions.md`.
