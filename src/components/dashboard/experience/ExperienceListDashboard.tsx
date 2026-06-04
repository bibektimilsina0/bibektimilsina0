"use client";

import React, { useState, useTransition } from "react";
import { Experience } from "@/types/content";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteExperience } from "@/lib/actions/experience";
import AddExperience from "./AddExperience";
import { toast } from "sonner";
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Trash2,
  Loader2,
} from "lucide-react";

interface ExperienceListDashboardProps {
  initialExperiences: Experience[];
}

export default function ExperienceListDashboard({
  initialExperiences,
}: ExperienceListDashboardProps) {
  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  React.useEffect(() => {
    setExperiences(initialExperiences);
  }, [initialExperiences]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this experience?")) {
      return;
    }
    setDeletingId(id);
    startTransition(async () => {
      try {
        const res = await deleteExperience(id);
        if (res.success) {
          toast.success("Experience deleted successfully");
          setExperiences((prev) => prev.filter((e) => e._id !== id));
        } else {
          toast.error(res.error || "Failed to delete experience");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred while deleting");
      } finally {
        setDeletingId(null);
      }
    });
  };

  if (experiences.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border/70 bg-card px-4 py-16 text-center">
        <div className="rounded-full border border-primary/10 bg-primary/5 p-4 text-primary">
          <Briefcase className="h-10 w-10 stroke-[1.5]" />
        </div>
        <div className="max-w-sm space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            No experience yet
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Add your first role to build out your work experience timeline.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {experiences.map((exp) => (
        <Card
          key={exp._id}
          className="flex flex-col justify-between border-border/50 bg-card transition-all duration-300 hover:border-primary/20 hover:shadow-md"
        >
          <CardHeader className="space-y-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" />
                <CardTitle className="text-base font-bold leading-tight">
                  {exp.company}
                </CardTitle>
              </div>
              <Badge variant="outline" className="shrink-0 text-[10px]">
                {exp.type}
              </Badge>
            </div>
            <p className="text-sm font-semibold text-primary">{exp.position}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {exp.duration}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {exp.location}
              </span>
            </div>
          </CardHeader>

          <CardContent className="flex-1 space-y-4">
            {exp.description.length > 0 && (
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary" />
                    <span className="line-clamp-2">{item}</span>
                  </li>
                ))}
              </ul>
            )}
            {exp.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {exp.technologies.map((tech, idx) => (
                  <Badge
                    key={`${exp._id}-${tech}-${idx}`}
                    variant="secondary"
                    className="h-5 px-1.5 py-0 text-[10px]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="flex items-center justify-between border-t border-border/50 bg-muted/20 py-3">
            <span className="font-mono text-xs text-muted-foreground">
              Order #{exp.id}
            </span>
            <div className="flex items-center gap-2">
              <AddExperience experience={exp} />
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-destructive/20 text-destructive hover:border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
                disabled={deletingId === exp._id}
                onClick={() => handleDelete(exp._id)}
                title="Delete Experience"
              >
                {deletingId === exp._id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
