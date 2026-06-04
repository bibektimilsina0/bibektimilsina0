"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ResponsiveDialog } from "@/components/dialog/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createExperience, updateExperience } from "@/lib/actions/experience";
import { Experience } from "@/types/content";
import { toast } from "sonner";
import { Plus, Pencil, Loader2 } from "lucide-react";

interface AddExperienceProps {
  experience?: Experience;
}

interface FormValues {
  id?: number;
  company: string;
  position: string;
  type: string;
  location: string;
  duration: string;
  description: string; // one bullet per line
  technologies: string; // comma separated
}

export default function AddExperience({ experience }: AddExperienceProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isEdit = !!experience;

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      id: experience?.id ?? undefined,
      company: experience?.company || "",
      position: experience?.position || "",
      type: experience?.type || "Full-time",
      location: experience?.location || "",
      duration: experience?.duration || "",
      description: experience?.description?.join("\n") || "",
      technologies: experience?.technologies?.join(", ") || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      try {
        const orderId = data.id ? Number(data.id) : undefined;
        const base = {
          company: data.company,
          position: data.position,
          type: data.type,
          location: data.location,
          duration: data.duration,
          description: data.description
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean),
          technologies: data.technologies
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        };

        let res;
        if (isEdit && experience?._id) {
          const payload =
            orderId && orderId > 0 ? { ...base, id: orderId } : base;
          res = await updateExperience(experience._id, payload);
        } else {
          res = await createExperience({
            ...base,
            id: orderId ?? 0,
          } as Omit<Experience, "_id">);
        }

        if (res.success) {
          toast.success(
            isEdit ? "Experience updated!" : "Experience added!",
          );
          setIsOpen(false);
          if (!isEdit) reset();
        } else {
          toast.error(res.error || "Something went wrong.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to save experience.");
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
            <span className="sr-only">Edit Experience</span>
          </Button>
        ) : (
          <Button className="bg-primary text-primary-foreground font-medium shadow-sm transition-all hover:shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Experience
          </Button>
        )
      }
      header={{
        icon: isEdit ? (
          <Pencil className="h-5 w-5" />
        ) : (
          <Plus className="h-5 w-5" />
        ),
        title: isEdit ? "Edit Experience" : "Add Experience",
        description: isEdit
          ? "Update this work experience entry."
          : "Add a new role to your work experience timeline.",
      }}
      contentClassName="max-w-2xl bg-card border-border"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="company">Company *</Label>
            <Input
              id="company"
              placeholder="e.g. Muktinath Krishi Company"
              {...register("company", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              placeholder="e.g. Software Developer"
              {...register("position")}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register("type")}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              placeholder="e.g. July 2025 - Present"
              {...register("duration")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g. Kathmandu, Nepal"
              {...register("location")}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Responsibilities (one bullet per line)
          </Label>
          <Textarea
            id="description"
            rows={5}
            placeholder="Built X using Y...&#10;Implemented Z..."
            className="min-h-28"
            {...register("description")}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies (comma separated)</Label>
            <Input
              id="technologies"
              placeholder="Next.js, TypeScript, MongoDB"
              {...register("technologies")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="id">Display order (optional)</Label>
            <Input
              id="id"
              type="number"
              placeholder="e.g. 1 (lower shows first)"
              {...register("id", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
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
              "Add Experience"
            )}
          </Button>
        </div>
      </form>
    </ResponsiveDialog>
  );
}
