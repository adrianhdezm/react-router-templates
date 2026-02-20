import { Form, Link, data, redirect } from 'react-router';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

import { APP_NAME } from '~/constants';

import type { Route } from './+types/login';

export function meta(_: Route.MetaArgs) {
  return [{ title: `Login | ${APP_NAME}` }];
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return data({ error: 'Email and password are required.' }, { status: 400 });
  }

  try {
    const { headers } = await context.auth.api.signInEmail({
      returnHeaders: true,
      body: { email, password },
      headers: request.headers
    });

    return redirect('/', { headers });
  } catch {
    return data({ error: 'Invalid email or password.' }, { status: 401 });
  }
}

export default function Login({ actionData }: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <Form method="post" className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required className="h-10" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="current-password" required className="h-10" />
        </div>
        {actionData?.error ? <p className="text-destructive text-sm">{actionData.error}</p> : null}
        <Button type="submit" className="h-10 w-full text-sm">
          Login
        </Button>
      </Form>
      <p className="text-muted-foreground text-center text-sm">
        No account?{' '}
        <Link className="text-foreground underline underline-offset-4" to="/register">
          Register
        </Link>
      </p>
    </div>
  );
}
