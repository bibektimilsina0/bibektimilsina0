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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 1500 1500"
                  className="w-12 h-12 shrink-0"
                >
                  <defs>
                    <clipPath id="footer-logo-clip-1">
                      <path
                        d="M 252.597656 32 L 1327.347656 32 L 1327.347656 1469 L 252.597656 1469 Z M 252.597656 32 "
                        clipRule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="footer-logo-clip-2">
                      <path
                        d="M 252.597656 263 L 485 263 L 485 1236 L 252.597656 1236 Z M 252.597656 263 "
                        clipRule="nonzero"
                      />
                    </clipPath>
                  </defs>
                  <g clipPath="url(#footer-logo-clip-1)">
                    <path
                      className="fill-neutral-900 dark:fill-neutral-100 transition-colors duration-300"
                      fillRule="nonzero"
                      d="M 484.445312 1467.21875 L 910.371094 1467.21875 C 1140.210938 1467.21875 1327.054688 1280.375 1327.054688 1050.535156 C 1327.054688 820.695312 1253.523438 779.308594 1142.21875 704.570312 C 1197.265625 633.851562 1230.214844 545.453125 1230.214844 449.015625 C 1230.214844 219.175781 1043.371094 32.332031 813.53125 32.332031 L 252.597656 32.332031 L 484.445312 263.777344 L 813.53125 263.777344 C 915.59375 263.777344 998.769531 346.953125 998.769531 449.015625 C 998.769531 551.078125 915.996094 634.253906 813.53125 634.253906 L 484.445312 634.253906 L 716.292969 866.101562 L 910.773438 866.101562 C 1012.832031 866.101562 1096.007812 949.277344 1096.007812 1051.339844 C 1096.007812 1153.398438 1012.832031 1236.574219 910.773438 1236.574219 L 252.597656 1236.574219 L 484.445312 1468.425781 Z M 484.445312 1467.21875"
                    />
                  </g>
                  <g clipPath="url(#footer-logo-clip-2)">
                    <path
                      className="fill-neutral-900 dark:fill-neutral-100 transition-colors duration-300"
                      fillRule="nonzero"
                      d="M 484.445312 633.851562 L 484.445312 495.222656 L 252.597656 263.777344 L 252.597656 1003.925781 L 484.445312 1235.371094 Z M 484.445312 633.851562"
                    />
                  </g>
                </svg>
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
