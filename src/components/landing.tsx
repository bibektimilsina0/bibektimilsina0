"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Github, Linkedin, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import TextReveal from "./fancy/text-reveal";

const techSkills = [
  "React.js",
  "Next.js",
  "Node.js",
  "Tailwind CSS",
  "JavaScript",
  "TypeScript",
  "MongoDB",
  "Express",
  "REST APIs",
  "GraphQL",
  "HTML",
  "C/C++",
  "Python",
  "Machine Learning",
  "NLP",
  "LLMs",
  "Firebase",
  "Git",
];

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/bibek.timilsina.568",
    label: "Facebook",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/bibek-timilsina-6a5477253/",
    label: "LinkedIn",
  },
  { icon: Github, href: "https://github.com/bibektimilsina0", label: "GitHub" },
];

function Landing() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="px-4 py-12"
    >
      <div className="flex-col space-y-12">
        {/* Text Section */}
        <div className=" md:flex items-center justify-around gap-8">
          <motion.div
            className="flex flex-col justify-center space-y-8"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <TextReveal as="p" className="text-lg text-muted-foreground">
                  Hello, I&apos;m
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
                  BIBEK
                  <br />
                  <span className="text-primary">TIMILSINA</span>
                </TextReveal>
              </motion.div>
            </div>

            {/* Social Links */}
            <motion.div
              className="flex space-x-4 justify-center text-center mb-4"
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
        <motion.div
          className="mt-16 space-y-6"
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
            {techSkills.map((tech) => (
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
      </div>
    </motion.section>
  );
}

export default Landing;
