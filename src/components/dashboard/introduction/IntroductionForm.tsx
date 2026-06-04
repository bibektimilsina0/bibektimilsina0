"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateIntroduction } from "@/lib/actions/introduction";
import { Introduction } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

interface FormValues {
  label: string;
  title: string;
  location: string;
  paragraphs: string; // one paragraph per line in the form
}

export default function IntroductionForm({
  introduction,
}: {
  introduction: Introduction;
}) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      label: introduction.label,
      title: introduction.title,
      location: introduction.location,
      paragraphs: introduction.paragraphs.join("\n"),
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const payload: Partial<Introduction> = {
        label: values.label,
        title: values.title,
        location: values.location,
        paragraphs: values.paragraphs
          .split("\n")
          .map((p) => p.trim())
          .filter(Boolean),
      };

      const res = await updateIntroduction(payload);
      if (res.success) {
        toast.success("Introduction updated!");
      } else {
        toast.error(res.error || "Something went wrong.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="label">Section Label</Label>
              <Input
                id="label"
                placeholder="Introduction"
                {...register("label")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Kathmandu, Nepal"
                {...register("location")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Title / Headline</Label>
            <Input
              id="title"
              placeholder="Full-Stack Developer & Modern Web Architect"
              {...register("title")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paragraphs">
              Description paragraphs (one paragraph per line)
            </Label>
            <Textarea
              id="paragraphs"
              rows={8}
              placeholder="Write each paragraph on its own line..."
              className="min-h-40"
              {...register("paragraphs")}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending} className="min-w-[140px]">
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
