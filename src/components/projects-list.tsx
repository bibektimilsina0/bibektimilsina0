import { Separator } from "@/components/ui/separator";
import ProjectsListClient from "@/components/projects-list-client";
import TextReveal from "./fancy/text-reveal";
import { getProjects } from "@/lib/actions/projects";



export default async function ProjectsList() {
  // Public portfolio shows only active projects.
  const projects = await getProjects(true);
  return (
    <section className="w-full px-4 py-12 sm:py-16" id="projects">
      <div className="mx-auto max-w-7xl space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div>
          <TextReveal
            as="p"
            className="text-sm font-medium text-muted-foreground uppercase tracking-wider "
          >
            My Projects
          </TextReveal>
          <Separator className="mt-2 w-12 mb-8" />
        </div>
        {/* Projects Display */}
        <ProjectsListClient projects={projects} />
      </div>
    </section>
  );
}
