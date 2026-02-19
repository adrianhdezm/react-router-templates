import { Button } from '~/components/ui/button';

import type { Route } from './+types/home';

export function meta(_: Route.MetaArgs) {
  return [{ title: 'Simple App' }, { name: 'description', content: 'Welcome to Simple App!' }];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.APP_NAME };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="flex min-h-screen min-w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold underline">{loaderData.message}</h1>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
