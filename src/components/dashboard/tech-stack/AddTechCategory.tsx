"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { ResponsiveDialog } from "@/components/dialog/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createTechCategory,
  updateTechCategory,
} from "@/lib/actions/tech-stack";
import { TechCategory } from "@/types/content";
import { TECH_ICON_OPTIONS } from "@/lib/icon-map";
import { toast } from "sonner";
import { Plus, Pencil, Loader2 } from "lucide-react";

interface AddTechCategoryProps {
  category?: TechCategory;
}

interface FormValues {
  id?: number;
  title: string;
  iconName: string;
  skills: string; // comma separated
}

export default function AddTechCategory({ category }: AddTechCategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const isEdit = !!category;

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      id: category?.id ?? undefined,
      title: category?.title || "",
      iconName: category?.iconName || "Code2",
      skills: category?.skills?.join(", ") || "",
    },
  });

  const onSubmit = (data: FormValues) => {
    startTransition(async () => {
      try {
        const orderId = data.id ? Number(data.id) : undefined;
        const base = {
          title: data.title,
          iconName: data.iconName,
          skills: data.skills
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        };

        let res;
        if (isEdit && category?._id) {
          const payload =
            orderId && orderId > 0 ? { ...base, id: orderId } : base;
          res = await updateTechCategory(category._id, payload);
        } else {
          res = await createTechCategory({
            ...base,
            id: orderId ?? 0,
          } as Omit<TechCategory, "_id">);
        }

        if (res.success) {
          toast.success(isEdit ? "Category updated!" : "Category added!");
          setIsOpen(false);
          if (!isEdit) reset();
        } else {
          toast.error(res.error || "Something went wrong.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to save category.");
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
            <span className="sr-only">Edit Category</span>
          </Button>
        ) : (
          <Button className="bg-primary text-primary-foreground font-medium shadow-sm transition-all hover:shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        )
      }
      header={{
        icon: isEdit ? (
          <Pencil className="h-5 w-5" />
        ) : (
          <Plus className="h-5 w-5" />
        ),
        title: isEdit ? "Edit Tech Category" : "Add Tech Category",
        description: isEdit
          ? "Update this technology stack category."
          : "Group related skills under a category shown in your tech stack.",
      }}
      contentClassName="max-w-xl bg-card border-border"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Category Title *</Label>
            <Input
              id="title"
              placeholder="e.g. Frontend"
              {...register("title", { required: true })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="iconName">Icon</Label>
            <select
              id="iconName"
              className="flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-sm shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...register("iconName")}
            >
              {TECH_ICON_OPTIONS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Skills (comma separated)</Label>
          <Input
            id="skills"
            placeholder="React.js, Next.js, TypeScript"
            {...register("skills")}
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
              "Add Category"
            )}
          </Button>
        </div>
      </form>
    </ResponsiveDialog>
  );
}
