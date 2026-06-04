"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import TextReveal from "./fancy/text-reveal";
import { Hero } from "@/types/content";
import { SOCIAL_PLATFORMS, socialHref } from "@/lib/icon-map";

function Landing({ hero }: { hero: Hero }) {
  const socialLinks = SOCIAL_PLATFORMS.filter(
    (p) => hero.social[p.key] && hero.social[p.key]!.trim() !== "",
  ).map((p) => ({
    icon: p.icon,
    label: p.label,
    href: socialHref(p.key, hero.social[p.key] as string),
  }));

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full px-4 py-10 sm:py-12"
    >
      <div className="flex-col space-y-14 sm:space-y-16">
        {/* Text + Image */}
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-around md:gap-12">
          <motion.div
            className="flex flex-col justify-center space-y-6 sm:space-y-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="space-y-4 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <TextReveal as="p" className="text-lg text-muted-foreground">
                  {hero.greeting}
                </TextReveal>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <TextReveal
                  as="h1"
                  className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
                >
                  {hero.firstName}
                  <br />
                  <span className="text-primary">{hero.lastName}</span>
                </TextReveal>
              </motion.div>
            </div>

            {/* Social Links */}
            {socialLinks.length > 0 && (
              <motion.div
                className="flex justify-center gap-4 md:justify-start"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
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
            )}
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="overflow-hidden border-2 shadow-lg py-0">
                <Image
                  src="/photo.jpg"
                  width={400}
                  height={400}
                  alt="Bibek Timilsina"
                  className="aspect-square object-contain"
                  priority
                />
              </Card>
            </motion.div>
          </motion.div>
        </div>
        {/* Tech Skills Section */}
        {hero.techExpertise.length > 0 && (
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <TextReveal
              as="h2"
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Tech Expertise
            </TextReveal>
            <motion.div
              className="flex flex-wrap gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.05 },
                },
              }}
            >
              {hero.techExpertise.map((tech) => (
                <motion.div
                  key={tech}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge
                    variant="secondary"
                    className="text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  >
                    {tech}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}

export default Landing;
