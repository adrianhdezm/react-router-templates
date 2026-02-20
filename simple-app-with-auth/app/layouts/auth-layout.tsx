import { Link, Outlet, redirect } from 'react-router';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

import type { Route } from './+types/auth-layout';

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await context.auth.api.getSession({
    headers: request.headers
  });
  if (session) {
    return redirect('/');
  }
  return { appName: context.APP_NAME };
}

export default function AuthLayout({ loaderData }: Route.ComponentProps) {
  return (
    <main className="from-background to-muted/50 flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <Card className="w-full max-w-md border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl tracking-tight">{loaderData.appName}</CardTitle>
          <CardDescription>Sign in with email and password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Outlet />
          <p className="text-muted-foreground text-center text-xs">
            Back to{' '}
            <Link className="text-foreground underline underline-offset-4" to="/">
              app
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
