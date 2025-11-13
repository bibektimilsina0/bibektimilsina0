"use client";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "./ui/separator";

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

export default function TechExpertise() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="container mx-auto px-4 py-12"
    >
      {/* Tech Skills Section */}
      <motion.div
        className="mt-16 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Tech Expertise
          </p>
          <Separator className="mt-2 w-12" />
        </div>
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
    </motion.section>
  );
}
