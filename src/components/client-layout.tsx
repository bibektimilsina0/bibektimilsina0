"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // your pathname-dependent logic here
  const isDashboard = pathname.includes("/dashboard");

  return (
    <>
      {!isDashboard && <Navbar />}
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}