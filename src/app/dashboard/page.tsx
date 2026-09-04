import {
  ArrowUpRight,
  Briefcase,
  File,
  Home,
  Inbox,
  Layers,
  Mail,
  UserRound,
} from "lucide-react";

import HeaderSection from "@/components/dashboard/HeaderSection";
import { HoverPrefetchLink } from "@/components/hover-prefetch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getContactMessages } from "@/lib/actions/contact-messages";
import { getExperiences } from "@/lib/actions/experience";
import { getProjects } from "@/lib/actions/projects";
import { getTechCategories } from "@/lib/actions/tech-stack";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Counts make each card a status line, not just a link.
  const [projects, techCategories, experiences, messages] = await Promise.all([
    getProjects(),
    getTechCategories(),
    getExperiences(),
    getContactMessages(),
  ]);

  const unread = messages.filter((m) => !m.read).length;

  const sections = [
    {
      title: "Hero",
      description: "Greeting, name, profile image, tech expertise, socials.",
      url: "/dashboard/hero",
      icon: Home,
      meta: "Landing section",
    },
    {
      title: "Introduction",
      description: "Your title, location, and about paragraphs.",
      url: "/dashboard/introduction",
      icon: UserRound,
      meta: "About section",
    },
    {
      title: "Projects",
      description: "Add, edit, and reorder the work you showcase.",
      url: "/dashboard/project",
      icon: File,
      meta: `${projects.length} project${projects.length === 1 ? "" : "s"}`,
    },
    {
      title: "Tech Stack",
      description: "Group the technologies you work with by category.",
      url: "/dashboard/tech-stack",
      icon: Layers,
      meta: `${techCategories.length} categor${
        techCategories.length === 1 ? "y" : "ies"
      }`,
    },
    {
      title: "Experience",
      description: "Roles, companies, and what you built at each.",
      url: "/dashboard/experience",
      icon: Briefcase,
      meta: `${experiences.length} role${experiences.length === 1 ? "" : "s"}`,
    },
    {
      title: "Contact",
      description: "Contact heading plus your email, phone, and location.",
      url: "/dashboard/contact",
      icon: Mail,
      meta: "Contact details",
    },
    {
      title: "Messages",
      description: "Submissions people send through your contact form.",
      url: "/dashboard/messages",
      icon: Inbox,
      meta: `${messages.length} received`,
      badge: unread > 0 ? `${unread} unread` : undefined,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full bg-background px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <HeaderSection
          title="Dashboard"
          description="Manage every section of your portfolio from one place."
          variant="bold"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <HoverPrefetchLink
              key={section.url}
              href={section.url}
              className="group block h-full focus-visible:outline-none"
            >
              <Card className="h-full border-border/50 transition-all duration-200 group-hover:border-primary/30 group-hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-3 py-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="rounded-lg border border-primary/10 bg-primary/5 p-2.5 text-primary">
                      <section.icon className="h-5 w-5 stroke-[1.5]" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-base font-semibold text-foreground">
                        {section.title}
                      </h2>
                      {section.badge && (
                        <Badge className="h-5 px-1.5 text-[10px]">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {section.description}
                    </p>
                  </div>

                  <span className="text-xs font-medium text-muted-foreground">
                    {section.meta}
                  </span>
                </CardContent>
              </Card>
            </HoverPrefetchLink>
          ))}
        </div>
      </div>
    </div>
  );
}
