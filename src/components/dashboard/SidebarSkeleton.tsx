import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { cn } from "../../lib/utils";

import { Skeleton } from "../ui/skeleton";
export function SidebarSkeleton() {
  return (
    <Sidebar
      collapsible="icon"
      className="h-full border-r border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <SidebarHeader className="h-16 border-b border-border/60 px-4 flex flex-col justify-center">
        <div className="flex items-center space-x-3 h-12">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <div className="space-y-1 group-data-[collapsible=icon]:hidden">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col h-full">
        {/* Main navigation skeleton */}
        <div className="flex-1 overflow-y-auto px-3 py-4 group-data-[collapsible=icon]:px-2">
          <div className="space-y-2 group-data-[collapsible=icon]:space-y-3">
            {/* Main navigation items */}
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-10 px-3 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center",
                  "rounded-lg flex items-center space-x-3"
                )}
              >
                <Skeleton className="w-4 h-4 shrink-0 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
                <Skeleton className="h-4 flex-1 group-data-[collapsible=icon]:hidden" />
              </div>
            ))}

            {/* Organization section divider */}
            <div className="pt-4 mt-4 border-t border-border/40 group-data-[collapsible=icon]:pt-3 group-data-[collapsible=icon]:mt-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-10 px-3 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center",
                    "rounded-lg flex items-center space-x-3"
                  )}
                >
                  <Skeleton className="w-4 h-4 shrink-0 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
                  <Skeleton className="h-4 flex-1 group-data-[collapsible=icon]:hidden" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secondary navigation skeleton */}
        <div className="border-t border-border/40 px-3 py-3 group-data-[collapsible=icon]:px-2">
          <div className="space-y-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "h-10 px-3 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center",
                  "rounded-lg flex items-center space-x-3"
                )}
              >
                <Skeleton className="w-4 h-4 shrink-0 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
                <Skeleton className="h-4 flex-1 group-data-[collapsible=icon]:hidden" />
              </div>
            ))}

            {/* Language switcher skeleton */}
            <div
              className={cn(
                "h-10 px-3 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center",
                "rounded-lg flex items-center space-x-3"
              )}
            >
              <Skeleton className="w-4 h-4 shrink-0 group-data-[collapsible=icon]:w-5 group-data-[collapsible=icon]:h-5" />
              <div className="flex-1 space-y-1 group-data-[collapsible=icon]:hidden">
                <Skeleton className="h-4 w-full" />
              </div>
              <Skeleton className="w-4 h-4 shrink-0 group-data-[collapsible=icon]:hidden" />
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/60 p-3 group-data-[collapsible=icon]:p-2">
        <div className="flex items-center space-x-3">
          <Skeleton className="w-8 h-8 rounded-full shrink-0" />
          <div className="space-y-1 group-data-[collapsible=icon]:hidden flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
          </div>
          <Skeleton className="w-4 h-4 shrink-0 group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
