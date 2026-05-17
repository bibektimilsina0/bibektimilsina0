"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DynamicBreadcrumbProps {
  // Define any props if needed
  className?: string;
}

const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = () => {
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const pathSegments = pathname.split("/").filter((crumb) => crumb);

    const breadcrumbs = pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);

      if (index === pathSegments.length - 1) {
        return (
          <BreadcrumbItem key={href}>
            <BreadcrumbPage>{label}</BreadcrumbPage>
          </BreadcrumbItem>
        );
      }

      // Other items are links
      return (
        <React.Fragment key={href}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={href}>{label}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </React.Fragment>
      );
    });

    return [
      <BreadcrumbItem key="home">
        <BreadcrumbLink asChild>
          <Link href="/">Home</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>,
      <BreadcrumbSeparator key="home-separator" />,
      ...breadcrumbs,
    ];
  };

  return (
    <Breadcrumb >
      <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
