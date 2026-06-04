"use client";

import React, { useState, useTransition } from "react";
import { TechCategory } from "@/types/content";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteTechCategory } from "@/lib/actions/tech-stack";
import { getIcon } from "@/lib/icon-map";
import AddTechCategory from "./AddTechCategory";
import { toast } from "sonner";
import { Layers, Trash2, Loader2 } from "lucide-react";

interface TechCategoryListDashboardProps {
  initialCategories: TechCategory[];
}

export default function TechCategoryListDashboard({
  initialCategories,
}: TechCategoryListDashboardProps) {
  const [categories, setCategories] =
    useState<TechCategory[]>(initialCategories);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  React.useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }
    setDeletingId(id);
    startTransition(async () => {
      try {
        const res = await deleteTechCategory(id);
        if (res.success) {
          toast.success("Category deleted successfully");
          setCategories((prev) => prev.filter((c) => c._id !== id));
        } else {
          toast.error(res.error || "Failed to delete category");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while deleting");
      } finally {
        setDeletingId(null);
      }
    });
  };

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/70 bg-card px-4 py-16 text-center">
        <div className="rounded-full border border-primary/10 bg-primary/5 p-4 text-primary">
          <Layers className="h-10 w-10 stroke-[1.5]" />
        </div>
        <div className="max-w-sm space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            No categories yet
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Add your first tech category to group the skills shown on your
            portfolio.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((cat) => {
        const Icon = getIcon(cat.iconName);
        return (
          <Card
            key={cat._id}
            className="flex flex-col justify-between border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-md"
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base font-semibold">
                  {cat.title}
                </CardTitle>
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, idx) => (
                  <Badge
                    key={`${cat._id}-${skill}-${idx}`}
                    variant="secondary"
                    className="text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t border-border/50 bg-muted/20 py-3">
              <span className="font-mono text-xs text-muted-foreground">
                Order #{cat.id}
              </span>
              <div className="flex items-center gap-2">
                <AddTechCategory category={cat} />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-destructive/20 text-destructive hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                  disabled={deletingId === cat._id}
                  onClick={() => handleDelete(cat._id)}
                  title="Delete Category"
                >
                  {deletingId === cat._id ? (
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
  );
}
