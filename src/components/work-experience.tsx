"use client";

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Building2 } from "lucide-react";

const workExperience = [
  {
    company: "Muktinath Krishi Company",
    position: "Software Developer",
    location: "Kathmandu, Nepal",
    duration: "July 2025 - Present",
    type: "Full-time",
    description: [
      "Developed and maintained Frontend of an ecommerce platform for agricultural products using Next.js with TypeScript",
      "Implemented state management using Zustand and server-state synchronization with React Query for optimal performance",
      "Utilized shadcn/ui component library to build consistent, accessible, and responsive user interfaces",
    ],
    technologies: [
      "Next.js",
      "TypeScript",
      "Zustand",
      "React Query",
      "shadcn/ui",
    ],
  },
  {
    company: "TutorHome Nepal",
    position: "Web Developer (Contract)",
    location: "Remote, Nepal",
    duration: "April 2024 - Oct 2024",
    type: "Contract",
    description: [
      "Collaborated to develop a fully functional tuition platform connecting parents and students with verified home tutors",
      "Implemented Firebase Authentication, Firestore Database, and Storage for secure user management and real-time data syncing",
      "Built responsive role-based dashboards for parents, tutors, and admins using Next.js and Tailwind CSS",
    ],
    technologies: [
      "Next.js",
      "Firebase",
      "Tailwind CSS",
      "React.js",
      "Firestore",
    ],
  },
];

function WorkExperience() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-16 w-full"
      id="experience"
    >
      <div className=" px-4 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Work Experience
          </p>
          <Separator className="mt-2 w-12 mb-8" />
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative w-full max-w-6xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-2 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px" />

          {workExperience.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.2 * index,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className={`relative mb-12 w-full ${
                index % 2 === 0
                  ? "md:flex md:justify-start"
                  : "md:flex md:justify-end"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-2 top-8 h-3 w-3 rounded-full bg-primary border-4 border-background md:left-1/2 md:-translate-x-1/2 z-10" />

              {/* Content */}
              <div
                className={`w-full md:w-1/2 md:max-w-lg ${
                  index % 2 === 0
                    ? "pl-8 md:pl-0 md:pr-8"
                    : "pl-8 md:pl-8 md:pr-0"
                }`}
              >
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-4 md:p-6">
                    {/* Company & Position */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <h3 className="text-lg font-semibold">
                          {experience.company}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {experience.type}
                        </Badge>
                      </div>
                      <h4 className="text-xl font-bold text-primary mb-3">
                        {experience.position}
                      </h4>
                    </div>

                    {/* Duration & Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span>{experience.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4 text-sm text-muted-foreground">
                      {experience.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="inline-block w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default WorkExperience;
