"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateContact } from "@/lib/actions/contact";
import { ContactInfo } from "@/types/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

export default function ContactForm({ contact }: { contact: ContactInfo }) {
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit } = useForm<Omit<ContactInfo, "_id">>({
    defaultValues: {
      heading: contact.heading,
      subheading: contact.subheading,
      email: contact.email,
      phone: contact.phone,
      location: contact.location,
    },
  });

  const onSubmit = (values: Omit<ContactInfo, "_id">) => {
    startTransition(async () => {
      const res = await updateContact(values);
      if (res.success) {
        toast.success("Contact info updated!");
      } else {
        toast.error(res.error || "Something went wrong.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card className="border-border/50 bg-card">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-2">
            <Label htmlFor="heading">Heading</Label>
            <Input
              id="heading"
              placeholder="Let's work together"
              {...register("heading")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subheading">Subheading</Label>
            <Textarea
              id="subheading"
              rows={3}
              placeholder="I'm always interested in new opportunities..."
              {...register("subheading")}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="+977 9800000000"
                {...register("phone")}
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
