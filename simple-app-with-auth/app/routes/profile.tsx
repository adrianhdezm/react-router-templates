import { redirect } from 'react-router';

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '~/components/ui/breadcrumb';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { Separator } from '~/components/ui/separator';
import { SidebarTrigger } from '~/components/ui/sidebar';

import { APP_NAME } from '~/constants';

import type { Route } from './+types/profile';

export function meta(_: Route.MetaArgs) {
  return [{ title: `Profile | ${APP_NAME}` }];
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const session = await context.auth.api.getSession({
    headers: request.headers
  });
  if (!session) {
    return redirect('/login');
  }
  return { user: session.user, session: session.session };
}

export default function Profile({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-vertical:h-4 data-vertical:self-auto" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Profile</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <section className="space-y-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>{loaderData.user.name}</CardTitle>
            <CardDescription>{loaderData.user.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">User ID</p>
              <p className="font-mono text-xs">{loaderData.user.id}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs tracking-wide uppercase">Session Expires</p>
              <p className="text-sm">{new Date(loaderData.session.expiresAt).toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <Label htmlFor="profile-session-window">Session window</Label>
              <Select defaultValue="7d" name="sessionWindow">
                <SelectTrigger id="profile-session-window" className="w-full sm:w-56">
                  <SelectValue placeholder="Select session window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">1 day</SelectItem>
                  <SelectItem value="7d">7 days</SelectItem>
                  <SelectItem value="30d">30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
