"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useLogout } from "@/hooks/mutations/useAuth";
import { useUserProfile } from "@/hooks/queries/auth";
import { NavMain } from "./nav-main";
import { File, LayoutDashboard } from "lucide-react";
import { NavUser } from "./nav-user";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { HoverPrefetchLink } from "../hover-prefetch";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isLoading, isError, error } = useUserProfile();
  const logoutMutation = useLogout();
  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  if (isLoading) {
    return <SidebarSkeleton />;
  }
  // Handle error or no session
  if (isError || !session) {
    return (
      <Sidebar
        {...props}
        className={cn("h-full border-r border-border/60", props.className)}
      >
        <SidebarContent className="flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            {error
              ? `Error loading profile: ${error.message}`
              : "Please sign in"}
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  const user = session.user;
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const data = {
    user: {
      name: user.name,
      email: user.email,
      avatar: user.image?.startsWith("http")
        ? user.image
        : `${backendUrl}/uploads${user.image?.startsWith("/") ? "" : "/"}${
            user.image
          }`,
    },
    adminNav: [
      { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
      { title: "Projects", url: "/dashboard/project", icon: File },
    ],
  };

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      className={cn(
        "h-full border-r border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ",
        props.className,
      )}
    >
      <SidebarHeader className="h-16 border-b border-border/60 px-3 flex flex-col justify-center">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild size="lg">
              <HoverPrefetchLink
                href="/"
                className="flex items-center w-full group-data-[collapsible=icon]:justify-center"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                    <Image
                      src="/bibektimilsina_logo.jpg"
                      alt="Logo"
                      height={32}
                      width={32}
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-semibold text-foreground truncate">
                      Bibek Timilsina
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Dashboard
                    </span>
                  </div>
                </div>
              </HoverPrefetchLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full overflow-hidden">
        <div className="relative flex-1 min-h-0">
          {/* Top Fade Gradient */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background via-background/50 to-transparent z-10" />
          <div
            className={cn(
              "h-full overflow-y-auto px-2 py-4",
              "[&::-webkit-scrollbar]:w-1",
              "[&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:bg-border",
              "[&::-webkit-scrollbar-thumb]:rounded-full",
              "[&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground/20",
            )}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "hsl(var(--border)) transparent",
            }}
          >
            <div className="space-y-2 group-data-[collapsible=icon]:space-y-3">
              <NavMain items={data.adminNav} />
            </div>
          </div>
          {/* Bottom Fade Gradient */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        </div>

        <div className="border-t border-border/40 px-3 py-2 group-data-[collapsible=icon]:px-2">
          <div className="mt-3">
            <div
              className={cn(
                "h-10 px-3 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center",
                "rounded-lg transition-all duration-200 ease-in-out",
                "hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
                "flex items-center w-full group-data-[collapsible=icon]:justify-center",
              )}
            ></div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-3 group-data-[collapsible=icon]:p-2">
        <NavUser user={data.user} onLogout={handleLogout} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
