# react-router-templates

This repository is a pnpm monorepo.

## Workspace

- `simple-app` — React Router + Express application
- `simple-app-with-db` — React Router + Express + PostgreSQL + Drizzle ORM application
- `simple-app-with-auth` — React Router + Express + PostgreSQL + Drizzle ORM + Better Auth application

## Use as Template

Create a new project from one of these templates:

- `npx create-react-router@latest --template adrianhdezm/react-router-templates/simple-app`
- `npx create-react-router@latest --template adrianhdezm/react-router-templates/simple-app-with-db`
- `npx create-react-router@latest --template adrianhdezm/react-router-templates/simple-app-with-auth`

After scaffolding:

- `cd <your-app-name>`
- `pnpm install`
- `pnpm dev`
