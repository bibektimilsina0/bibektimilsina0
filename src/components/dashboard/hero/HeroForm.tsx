"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateHero } from "@/lib/actions/hero";
import { Hero } from "@/types/content";
import ImageUpload from "@/components/dashboard/ImageUpload";
import { SOCIAL_PLATFORMS } from "@/lib/icon-map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

interface FormValues {
  greeting: string;
  firstName: string;
  lastName: string;
  profileImage: string;
  techExpertise: string; // comma-separated in the form
  facebook: string;
  linkedin: string;
  github: string;
  email: string;
  twitter: string;
  instagram: string;
}

export default function HeroForm({ hero }: { hero: Hero }) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      greeting: hero.greeting,
      firstName: hero.firstName,
      lastName: hero.lastName,
      profileImage: hero.profileImage,
      techExpertise: hero.techExpertise.join(", "),
      facebook: hero.social.facebook || "",
      linkedin: hero.social.linkedin || "",
      github: hero.social.github || "",
      email: hero.social.email || "",
      twitter: hero.social.twitter || "",
      instagram: hero.social.instagram || "",
    },
  });

  const profileImage = watch("profileImage");

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      const payload: Partial<Hero> = {
        greeting: values.greeting,
        firstName: values.firstName,
        lastName: values.lastName,
        profileImage: values.profileImage,
        techExpertise: values.techExpertise
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        social: {
          facebook: values.facebook,
          linkedin: values.linkedin,
          github: values.github,
          email: values.email,
          twitter: values.twitter,
          instagram: values.instagram,
        },
      };

      const res = await updateHero(payload);
      if (res.success) {
        toast.success("Hero section updated!");
      } else {
        toast.error(res.error || "Something went wrong.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-6 p-6">
          <ImageUpload
            label="Profile Image"
            value={profileImage}
            onChange={(url) => setValue("profileImage", url)}
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="greeting">Greeting</Label>
              <Input
                id="greeting"
                placeholder="Hello, I'm"
                {...register("greeting")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="BIBEK"
                {...register("firstName")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="TIMILSINA"
                {...register("lastName")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="techExpertise">
              Tech Expertise badges (comma separated)
            </Label>
            <Input
              id="techExpertise"
              placeholder="React.js, Next.js, Node.js"
              {...register("techExpertise")}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-4 p-6">
          <h3 className="text-sm font-semibold text-foreground">
            Social Links
          </h3>
          <p className="text-xs text-muted-foreground">
            Leave a field empty to hide that icon. Email can be a plain address.
          </p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {SOCIAL_PLATFORMS.map((p) => (
              <div key={p.key} className="space-y-2">
                <Label htmlFor={p.key} className="flex items-center gap-2">
                  <p.icon className="h-4 w-4 text-primary" />
                  {p.label}
                </Label>
                <Input
                  id={p.key}
                  placeholder={
                    p.key === "email"
                      ? "you@example.com"
                      : `https://${p.key}.com/...`
                  }
                  {...register(p.key)}
                />
              </div>
            ))}
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
