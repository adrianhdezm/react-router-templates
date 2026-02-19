import { Button } from '~/components/ui/button';

import { database } from '~/db/context';

import type { Route } from './+types/home';

export function meta(_: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }];
}

export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const files = await db.query.files.findMany({
    columns: {
      id: true,
      name: true
    }
  });
  return { message: context.APP_NAME, files };
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
