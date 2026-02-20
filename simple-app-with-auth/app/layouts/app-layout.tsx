import { Outlet, redirect, useLocation } from 'react-router';

import { AppSidebar } from '~/components/app-sidebar';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';

import type { Route } from './+types/app-layout';

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await context.auth.api.getSession({
    headers: request.headers
  });
  if (!session) {
    return redirect('/login');
  }
  return { user: session.user, appName: context.APP_NAME };
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar appName={loaderData.appName} user={loaderData.user} pathname={location.pathname} />
      <SidebarInset>
        <main className="flex min-h-svh flex-1 flex-col">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
