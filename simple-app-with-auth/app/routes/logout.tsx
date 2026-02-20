import { redirect } from 'react-router';

import type { Route } from './+types/logout';

export async function action({ request, context }: Route.ActionArgs) {
  const { headers } = await context.auth.api.signOut({
    headers: request.headers,
    asResponse: true
  });

  return redirect('/login', { headers });
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const { headers } = await context.auth.api.signOut({
    headers: request.headers,
    asResponse: true
  });

  return redirect('/login', { headers });
}
