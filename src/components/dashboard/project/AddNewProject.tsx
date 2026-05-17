"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ResponsiveDialog } from "@/components/dialog/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createProject, updateProject } from "@/lib/actions/projects";
import { Project } from "@/types/project";
import { toast } from "sonner";
import { Plus, Pencil, Loader2 } from "lucide-react";

interface AddNewProjectProps {
  project?: Project;
}

export default function AddNewProject({ project }: AddNewProjectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isEdit = !!project;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Project, "_id" | "id">>({
    defaultValues: {
      projectTitle: project?.projectTitle || "",
      projectDescription: project?.projectDescription || "",
      projectLink: project?.projectLink || "",
      githubLink: project?.githubLink || "",
      preview: project?.preview || "",
      technologies: project?.technologies || "",
    },
  });

  const onSubmit = async (data: Omit<Project, "_id" | "id">) => {
    startTransition(async () => {
      try {
        let res;
        if (isEdit && project?._id) {
          res = await updateProject(project._id, data);
        } else {
          res = await createProject(data);
        }

        if (res.success) {
          toast.success(
            isEdit
              ? "Project updated successfully!"
              : "Project created successfully!"
          );
          setIsOpen(false);
          if (!isEdit) {
            reset();
          }
        } else {
          toast.error(res.error || "Something went wrong.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to save project.");
      }
    });
  };

  return (
    <ResponsiveDialog
      open={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        isEdit ? (
          <Button variant="outline" size="icon" className="h-9 w-9">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit Project</span>
          </Button>
        ) : (
          <Button className="bg-primary text-primary-foreground font-medium shadow-sm transition-all hover:shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add New Project
          </Button>
        )
      }
      header={{
        icon: isEdit ? <Pencil className="h-5 w-5" /> : <Plus className="h-5 w-5" />,
        title: isEdit ? "Edit Project" : "Add New Project",
        description: isEdit
          ? "Update your project details below."
          : "Fill in the details to showcase your project.",
      }}
      contentClassName="max-w-2xl bg-card border-border"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="e.g. Portfolio Website"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div> */}

          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title (Display Overlay)</Label>
            <Input
              id="projectTitle"
              placeholder="e.g. My Awesome Portfolio"
              {...register("projectTitle")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="projectLink">Live Link</Label>
            <Input
              id="projectLink"
              placeholder="https://example.com"
              type="url"
              {...register("projectLink")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="githubLink">GitHub Repository Link</Label>
            <Input
              id="githubLink"
              placeholder="https://github.com/username/repo"
              type="url"
              {...register("githubLink")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="preview">Preview Image URL</Label>
            <Input
              id="preview"
              placeholder="https://example.com/preview.png"
              {...register("preview")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma separated)</Label>
            <Input
              id="technologies"
              placeholder="React, Next.js, TailwindCSS"
              {...register("technologies")}
            />
          </div>
        </div>

        {/* <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            placeholder="A short summary of the project..."
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && (
            <p className="text-xs text-destructive">{errors.description.message}</p>
          )}
        </div> */}

        <div className="space-y-2">
          <Label htmlFor="projectDescription">Project Description (Display Detail)</Label>
          <Textarea
            id="projectDescription"
            placeholder="Detailed description to display to users..."
            {...register("projectDescription")}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isPending} className="min-w-[100px]">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Create Project"
            )}
          </Button>
        </div>
      </form>
    </ResponsiveDialog>
  );
}
