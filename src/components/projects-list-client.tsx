"use client";

import { motion } from "motion/react";
import ProjectCard from "@/components/project-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Project } from "@/types/project";

interface ProjectsListClientProps {
  projects: Project[];
}

export default function ProjectsListClient({
  projects,
}: ProjectsListClientProps) {
  const showCarousel = projects.length > 3;

  // Convert API data to component format
  const formattedProjects = projects.map((project) => ({
    url: `/projects/${project._id}`,
    slugs: [project._id.toString()],
    data: {
      title: project.projectTitle || project.title,
      description: project.projectDescription || project.description,
      tags: project.technologies
        ? project.technologies
            .split(",")
            .map((tech) => ({ label: tech.trim() }))
        : [],
    },
    links: {
      project: project.projectLink,
      github: project.githubLink,
      preview: project.preview,
    },
  }));

  if (formattedProjects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <p className="text-muted-foreground">No projects found.</p>
      </motion.div>
    );
  }

  return (
    <>
      {showCarousel ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="max-w-6xl xl:max-w-7xl mx-auto"
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-sm md:max-w-none"
          >
            <CarouselContent className="ml-1">
              {formattedProjects.map((project, index) => (
                <CarouselItem
                  key={`project_${project.slugs[0]}`}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.1 * index,
                      duration: 0.6,
                      ease: "easeOut",
                    }}
                  >
                    <ProjectCard
                      title={project.data.title}
                      href={project.url}
                      description={project.data.description}
                      tags={project.data.tags}
                      thumbnail={project.links.preview || "/photo.jpg"}
                      className="h-full hover:shadow-lg transition-all duration-300"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex left-2" />
            <CarouselNext className="hidden md:flex right-2" />
          </Carousel>
        </motion.div>
      ) : (
        <motion.div
          className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.4,
              },
            },
          }}
        >
          {formattedProjects.map((project) => (
            <motion.div
              key={`project_${project.slugs[0]}`}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              <ProjectCard
                title={project.data.title}
                href={project.url}
                description={project.data.description}
                tags={project.data.tags}
                thumbnail={
                  project.links.preview ||
                  `/images/projects/${project.slugs[0]}/cover.jpg`
                }
                className="h-full hover:shadow-lg transition-all duration-300"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
