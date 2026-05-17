"use client";

import { type LucideIcon } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import { HoverPrefetchLink } from "../hover-prefetch";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarMenu className="space-y-1">
      {items.map((item) => {
        const isActive =
          pathname === item.url ||
          (item.url !== "/dashboard" && pathname.startsWith(item.url + "/"));

        return (
          <SidebarMenuItem
            key={item.title}
            className={cn("flex justify-center items-center")}
          >
            <SidebarMenuButton
              tooltip={item.title}
              className={cn(
                "h-10 px-3 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center flex",
                "rounded-lg transition-all duration-200 ease-in-out",
                !isActive &&
                  "bg-transparent hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
                isActive &&
                  "bg-accent text-accent-foreground font-medium shadow-sm border border-border/50"
              )}
            >
              <HoverPrefetchLink
                href={item.url}
                className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center"
              >
                {item.icon && (
                  <item.icon className="w-4 h-4 shrink-0 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
                )}
                <span className="truncate group-data-[collapsible=icon]:hidden text-sm font-medium">
                  {item.title}
                </span>
              </HoverPrefetchLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
