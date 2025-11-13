"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "./theme-toggle-button";

const navigation = [
  { name: "About me", href: "/" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 max-w-7xl mx-auto">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4">
        {/* Logo and greeting section */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/bibektimilsina_logo.jpg"
            width={40}
            height={40}
            alt="Bibek Timilsina"
            className="rounded-full ring-2 ring-border"
          />
          <span className="hidden font-semibold sm:inline-block">
            Hey, What&apos;s Up?
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navigation.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-foreground hover:text-primary transition-colors hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src="/bibektimilsina_logo.jpg"
                  width={32}
                  height={32}
                  alt="Bibek Timilsina"
                  className="rounded-full"
                />
                <span className="font-bold">Bibek Timilsina</span>
              </Link>
              <nav className="mt-8 flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          {/* theme switch */}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
