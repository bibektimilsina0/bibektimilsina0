"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft, Github, Globe, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";
import TextReveal from "./fancy/text-reveal";

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const technologies = project.technologies
    ? project.technologies.split(",").map((tech) => tech.trim())
    : [];

  return (
    <div className=" min-h-screen items-center justify-center bg-background max-w-7xl mx-auto">
      {/* Main Content */}
      <motion.main
        className="px-2 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Header */}
        <div className="py-4">
          <Link href="/#projects">
            <Button variant="ghost" className="gap-2 group">
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>
          </Link>
        </div>
        <div className="px-4 py-4">
          {/* Project Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <TextReveal as="h1" className="text-4xl md:text-5xl font-bold mb-4">
              {project.projectTitle || project.title}
            </TextReveal>
            <TextReveal
              as="p"
              className="text-xl text-muted-foreground mb-6 leading-relaxed"
            >
              {project.projectDescription || project.description}
            </TextReveal>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.projectLink && (
                <Button asChild size="lg" className="gap-2">
                  <Link
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="h-4 w-4" />
                    Live Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
              {project.githubLink && (
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="space-y-3">
                <TextReveal
                  as="h3"
                  className="text-sm font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Technologies Used
                </TextReveal>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Project Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="relative aspect-video overflow-hidden rounded-xl border shadow-lg">
              <Image
                src={project.preview || "/photo.jpg"}
                alt={project.projectTitle || project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Project Description */}
          {project.description && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="prose prose-neutral dark:prose-invert max-w-none"
            >
              <TextReveal as="h2" className="text-2xl font-semibold mb-4">
                About This Project
              </TextReveal>
              <TextReveal
                as="p"
                className="text-muted-foreground leading-relaxed text-lg"
              >
                {project.description}
              </TextReveal>
            </motion.div>
          )}
        </div>
      </motion.main>
    </div>
  );
}
