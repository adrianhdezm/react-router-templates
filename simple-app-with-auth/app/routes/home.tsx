import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '~/components/ui/breadcrumb';
import { Separator } from '~/components/ui/separator';
import { SidebarTrigger } from '~/components/ui/sidebar';

import { database } from '~/db/context';

import type { Route } from './+types/home';

export function meta({ loaderData }: Route.MetaArgs) {
  return [{ title: loaderData?.appName ?? 'App' }, { name: 'description', content: 'A simple authenticated React Router app.' }];
}

export async function loader({ context }: Route.LoaderArgs) {
  const db = database();

  const users = await db.query.users.findMany({
    columns: {
      id: true
    }
  });
  return { appName: context.APP_NAME, usersCount: users.length };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Build Your Application</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>{loaderData.appName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">App</p>
            <p className="text-lg font-semibold">{loaderData.appName}</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">Users</p>
            <p className="text-lg font-semibold">{loaderData.usersCount}</p>
          </div>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-muted-foreground text-xs tracking-wide uppercase">Authentication</p>
            <p className="text-lg font-semibold">Active</p>
          </div>
        </div>
        <div className="bg-muted/50 min-h-[60vh] flex-1 rounded-xl p-6">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            You are logged in. This starter keeps SSR, Drizzle, PostgreSQL, and Better Auth configured out of the box.
          </p>
        </div>
      </div>
    </>
  );
}
