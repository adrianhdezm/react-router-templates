import { Form, Link, data, redirect } from 'react-router';

import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

import { APP_NAME } from '~/constants';

import type { Route } from './+types/register';

export function meta(_: Route.MetaArgs) {
  return [{ title: `Register | ${APP_NAME}` }];
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
    return data({ error: 'Name, email, and password are required.' }, { status: 400 });
  }

  try {
    const { response, headers } = await context.auth.api.signUpEmail({
      returnHeaders: true,
      body: {
        name,
        email,
        password
      },
      headers: request.headers
    });

    if (!response.user?.id) {
      return data({ error: 'Unable to register this user.' }, { status: 400, headers });
    }

    return redirect('/', { headers });
  } catch {
    return data({ error: 'Unable to register this user.' }, { status: 400 });
  }
}

export default function Register({ actionData }: Route.ComponentProps) {
  return (
    <div className="space-y-5">
      <Form method="post" className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" autoComplete="name" required className="h-10" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required className="h-10" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" autoComplete="new-password" minLength={8} required className="h-10" />
        </div>
        {actionData?.error ? <p className="text-destructive text-sm">{actionData.error}</p> : null}
        <Button type="submit" className="h-10 w-full text-sm">
          Register
        </Button>
      </Form>
      <p className="text-muted-foreground text-center text-sm">
        Already have an account?{' '}
        <Link className="text-foreground underline underline-offset-4" to="/login">
          Login
        </Link>
      </p>
    </div>
  );
}
