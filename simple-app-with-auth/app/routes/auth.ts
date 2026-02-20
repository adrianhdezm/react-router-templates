import type { Route } from './+types/auth';

export async function loader({ context, request }: Route.LoaderArgs) {
  return context.auth.handler(request);
}

export async function action({ context, request }: Route.ActionArgs) {
  return context.auth.handler(request);
}
