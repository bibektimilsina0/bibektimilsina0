"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Facebook, Mail } from "lucide-react";

const navigationLinks = [
  { name: "About me", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/bibektimilsina0",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/bibek-timilsina-6a5477253/",
    label: "LinkedIn",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/bibek.timilsina.568",
    label: "Facebook",
  },
  {
    icon: Mail,
    href: "mailto:bibektimilsina@gmail.com",
    label: "Email",
  },
];

function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="flex flex-col space-y-8">
          {/* Top Section - Logo, Navigation, Social Icons */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-start"
            >
              <Link href="/" className="flex items-center space-x-3">
                <Image
                  src="/bibektimilsina_logo.jpg"
                  width={48}
                  height={48}
                  alt="Bibek Timilsina"
                  className="rounded-full ring-2 ring-border"
                />
                <span className="text-xl font-bold">Bibek Timilsina</span>
              </Link>
            </motion.div>

            {/* Navigation Links */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 lg:gap-8"
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </motion.nav>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end space-x-3"
            >
              {socialLinks.map((social) => (
                <motion.div
                  key={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="icon" asChild>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <social.icon className="h-4 w-4" />
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Separator className="w-full" />

          {/* Bottom Section - Footer Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left"
          >
            <p className="text-sm text-muted-foreground">
              Thanks for scrolling,{" "}
              <span className="text-xs text-muted-foreground/70">
                that&apos;s all folks.
              </span>
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Bibek Timilsina. All rights
              reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
