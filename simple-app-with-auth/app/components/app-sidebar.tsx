import { AppStoreIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import * as React from 'react';
import { NavLink } from 'react-router';

import { NavUser } from '~/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '~/components/ui/sidebar';

type SidebarUser = {
  name: string | null;
  email: string;
  image?: string | null;
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  appName: string;
  pathname: string;
  user: SidebarUser;
};

export function AppSidebar({ appName, pathname, user, ...props }: AppSidebarProps) {
  const isHome = pathname === '/';
  const isProfile = pathname.startsWith('/profile');

  return (
    <Sidebar {...props}>
      <SidebarHeader className="gap-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                <HugeiconsIcon icon={AppStoreIcon} strokeWidth={2} />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">{appName}</span>
                <span className="">Framework mode + DB + Better Auth</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton render={<NavLink to="/" end />} isActive={isHome}>
                  Home
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton render={<NavLink to="/profile" />} isActive={isProfile}>
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
