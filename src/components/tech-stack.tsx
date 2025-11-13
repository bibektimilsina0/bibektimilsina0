"use client";
import { motion } from "motion/react";
import { Code2, Database, Zap, Palette } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import TextReveal from "./fancy/text-reveal";

// Tech skills organized by category
const techSkills = {
  frontend: {
    icon: Palette,
    title: "Frontend",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  backend: {
    icon: Database,
    title: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "NestJS",
      "MongoDB",
      "Firebase",
      "PostgreSQL",
      "REST APIs",
      "GraphQL",
    ],
  },
  stateManagement: {
    icon: Zap,
    title: "State Management",
    skills: ["Redux Toolkit", "Zustand", "Context API", "React Query"],
  },
  tools: {
    icon: Code2,
    title: "Tools & Others",
    skills: ["Git", "Docker", "Firebase", "Vercel"],
  },
};

function TechStack() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="px-4 py-12"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section Header */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <TextReveal
            as="p"
            className="text-sm font-medium text-muted-foreground uppercase tracking-wider"
          >
            Technology Stack
          </TextReveal>
          <Separator className="mt-2 w-12" />
        </motion.div>

        {/* Tech Stack Grid */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="space-y-6"
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(techSkills).map(
              ([key, category], categoryIndex) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={key}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.6 + categoryIndex * 0.1,
                      duration: 0.6,
                    }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <h3 className="font-semibold text-sm">
                            {category.title}
                          </h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.skills.map((skill, skillIndex) => (
                            <motion.div
                              key={skill}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                delay:
                                  0.8 + categoryIndex * 0.1 + skillIndex * 0.05,
                                duration: 0.3,
                              }}
                            >
                              <Badge
                                variant="secondary"
                                className="text-xs hover:bg-primary/20 transition-colors cursor-default"
                              >
                                {skill}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              }
            )}
          </div>
        </motion.div>

        {/* Key Expertise Highlights */}
        {/* <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid gap-4 md:grid-cols-3"
        >
          <Card className="text-center p-6 border-dashed hover:border-solid transition-all">
            <h4 className="font-semibold text-primary mb-2">Modern React</h4>
            <p className="text-sm text-muted-foreground">
              React 18, Server Components, Suspense, Concurrent Features
            </p>
          </Card>
          <Card className="text-center p-6 border-dashed hover:border-solid transition-all">
            <h4 className="font-semibold text-primary mb-2">Type Safety</h4>
            <p className="text-sm text-muted-foreground">
              TypeScript, Zod validation, end-to-end type safety
            </p>
          </Card>
          <Card className="text-center p-6 border-dashed hover:border-solid transition-all">
            <h4 className="font-semibold text-primary mb-2">
              Performance First
            </h4>
            <p className="text-sm text-muted-foreground">
              Optimized builds, lazy loading, efficient state management
            </p>
          </Card>
        </motion.div> */}
      </div>
    </motion.section>
  );
}

export default TechStack;
