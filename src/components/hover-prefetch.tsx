"use client";

import Link from "next/link";
import { useState } from "react";

export function HoverPrefetchLink({
  href,
  children,
  className,
  onClick,
  target,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?:()=>void;
  target?:string
}) {
  const [active, setActive] = useState(false);

  return (
    <Link
      href={href}
      prefetch={active ? null : false}
      onMouseEnter={() => setActive(true)}
      onClick={onClick}
      className={className}
      target={target}
    >
      {children}
    </Link>
  );
}
