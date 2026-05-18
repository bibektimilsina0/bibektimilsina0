"use client";

import React, { useState, useTransition } from "react";
import { Project } from "@/types/project";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteProject } from "@/lib/actions/projects";
import AddNewProject from "./AddNewProject";
import { toast } from "sonner";
import {
  Search,
  Github,
  Trash2,
  FolderKanban,
  Sparkles,
  Globe,
  Loader2,
  X,
} from "lucide-react";
import Image from "next/image";


interface ProjectListDashboardProps {
  initialProjects: Project[];
}

export default function ProjectListDashboard({
  initialProjects,
}: ProjectListDashboardProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Keep state sync'd if server component fetches new projects
  React.useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const filteredProjects = projects.filter((project) => {
    const title = (project.projectTitle || project.title || "").toLowerCase();
    const desc = (project.projectDescription || project.description || "").toLowerCase();
    const tech = (project.technologies || "").toLowerCase();
    const term = searchTerm.toLowerCase();
    return title.includes(term) || desc.includes(term) || tech.includes(term);
  });

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    setDeletingId(id);
    startTransition(async () => {
      try {
        const res = await deleteProject(id);
        if (res.success) {
          toast.success("Project deleted successfully");
          setProjects((prev) => prev.filter((p) => p._id !== id));
        } else {
          toast.error(res.error || "Failed to delete project");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while deleting");
      } finally {
        setDeletingId(null);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Summary Control */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border/50 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, description, or technology..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-8 w-full bg-background"
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
              onClick={() => setSearchTerm("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="text-sm text-muted-foreground font-medium shrink-0">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-card rounded-xl border border-dashed border-border/70 text-center space-y-4">
          <div className="p-4 bg-primary/5 rounded-full text-primary border border-primary/10">
            <FolderKanban className="h-10 w-10 stroke-[1.5]" />
          </div>
          <div className="space-y-2 max-w-sm">
            <h3 className="text-lg font-semibold text-foreground">No projects found</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {searchTerm
                ? "No projects match your search query. Try typing something else or clear the search filter."
                : "Get started by adding your first project to showcase on your portfolio website!"}
            </p>
          </div>
          {searchTerm && (
            <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-2">
              Clear Search
            </Button>
          )}
        </div>
      )}

      {/* Projects Grid */}
      {filteredProjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const displayTitle = project.projectTitle || project.title;
            const displayDesc = project.projectDescription || project.description;
            const techArray = project.technologies
              ? project.technologies.split(",").map((t) => t.trim())
              : [];

            return (
              <Card
                key={project._id}
                className="group relative flex flex-col justify-between border-border/50 bg-card hover:border-primary/20 hover:shadow-md transition-all duration-300 overflow-hidden py-0"
              >
                {/* Optional Image Preview / Visual Gradient Container */}
                <div className="relative aspect-video w-full overflow-hidden border-b border-border/50 bg-muted flex items-center justify-center">
                  {project.preview ? (
                    <Image
                      src={project.preview}
                      alt={displayTitle}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center">
                      <FolderKanban className="h-12 w-12 text-muted-foreground/30 stroke-[1]" />
                    </div>
                  )}

                  {/* ID Tag overlay */}
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-xs text-xs font-semibold px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground shadow-xs">
                    #{project.id}
                  </div>
                </div>

                <CardHeader className="space-y-2 p-5 pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg font-bold text-foreground line-clamp-1 leading-tight group-hover:text-primary transition-colors duration-300">
                      {displayTitle}
                    </CardTitle>
                    <Badge
                      variant={project.projectType || "personal"}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize shrink-0"
                    >
                      {project.projectType || "personal"}
                    </Badge>
                  </div>
                  <CardDescription className="text-xs text-muted-foreground flex items-center gap-1 font-mono">
                    <Sparkles className="h-3 w-3 text-primary/70" />
                    {project.title}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 p-5 flex-1">
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {displayDesc}
                  </p>

                  {/* Tech stack badges */}
                  {techArray.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {techArray.map((tech, idx) => (
                        <Badge
                          key={`${project._id}-${tech}-${idx}`}
                          variant="secondary"
                          className="text-[10px] font-medium h-5 px-1.5 py-0 border-border/50 bg-secondary/30 hover:bg-secondary/50 text-foreground"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t border-border/50 p-5 bg-muted/20">
                  {/* External Links */}
                  <div className="flex items-center gap-2">
                    {project.githubLink && (
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" title="View GitHub Code">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {project.projectLink && (
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-muted-foreground hover:text-primary">
                        <a href={project.projectLink} target="_blank" rel="noopener noreferrer" title="View Live Preview">
                          <Globe className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>

                  {/* Actions (Edit / Delete) */}
                  <div className="flex items-center gap-2">
                    <AddNewProject project={project} />

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9 w-9 text-destructive border-destructive/20 hover:bg-destructive/10 hover:border-destructive/30 hover:text-destructive"
                      disabled={deletingId === project._id}
                      onClick={() => handleDelete(project._id)}
                      title="Delete Project"
                    >
                      {deletingId === project._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
