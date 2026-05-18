"use client";

import { motion } from "motion/react";
import ProjectCard from "@/components/project-card";
import { Project } from "@/types/project";
import { Briefcase, Building2, User } from "lucide-react";

interface ProjectsListClientProps {
  projects: Project[];
}

interface ProjectSectionProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  projects: Project[];
}

function ProjectSection({
  title,
  subtitle,
  icon,
  projects,
}: ProjectSectionProps) {
  if (projects.length === 0) return null;

  return (
    <div className="space-y-6 py-6 first:pt-0">
      {/* Header Container */}
      <div className="flex items-center gap-3 border-b border-border/40 pb-4">
        <div className="p-2 bg-primary/5 rounded-lg text-primary border border-primary/10">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold tracking-tight text-foreground">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        </div>
        <div className="ml-auto text-xs font-mono text-muted-foreground bg-secondary/30 px-2.5 py-0.5 rounded-full border border-border/50">
          {projects.length} {projects.length === 1 ? "project" : "projects"}
        </div>
      </div>

      {/* Grid Container */}
      <motion.div
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
            },
          },
        }}
      >
        {projects.map((project) => {
          // Parse tag labels from comma-separated technologies string
          const tags = project.technologies
            ? project.technologies
                .split(",")
                .map((tech) => ({ label: tech.trim() }))
            : [];

          return (
            <motion.div
              key={`project_${project._id}`}
              variants={{
                hidden: { opacity: 0, y: 25, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: "easeOut" },
                },
              }}
            >
              <ProjectCard
                title={project.projectTitle || project.title}
                description={project.projectDescription || project.description}
                href={`/projects/${project._id}`}
                tags={tags}
                thumbnail={project.preview || "/photo.jpg"}
                projectType={project.projectType}
                className="h-full hover:shadow-lg transition-all duration-300"
              />
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function ProjectsListClient({
  projects,
}: ProjectsListClientProps) {
  if (projects.length === 0) {
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

  // Filter projects by category directly using database properties
  const clientProjects = projects.filter((p) => p.projectType === "client");
  const companyProjects = projects.filter((p) => p.projectType === "company");
  const personalProjects = projects.filter(
    (p) => p.projectType === "personal" || !p.projectType,
  );

  return (
    <div className="space-y-12">
      <ProjectSection
        title="Client Work"
        subtitle="Commercial projects built for private clients and consulting engagements."
        icon={<Briefcase className="h-4 w-4" />}
        projects={clientProjects}
      />
      <ProjectSection
        title="Enterprise & Company Work"
        subtitle="Core modules, services, and applications designed during corporate employment."
        icon={<Building2 className="h-4 w-4" />}
        projects={companyProjects}
      />
      <ProjectSection
        title="Personal & College Works"
        subtitle="Self-initiated applications, libraries, and experimental software tools."
        icon={<User className="h-4 w-4" />}
        projects={personalProjects}
      />
    </div>
  );
}
