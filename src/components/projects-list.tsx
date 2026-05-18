import { Separator } from "@/components/ui/separator";
import ProjectsListClient from "@/components/projects-list-client";
import TextReveal from "./fancy/text-reveal";
import { getProjects } from "@/lib/actions/projects";



export default async function ProjectsList() {
  const projects = await getProjects();
  return (
    <section className="px-4 py-12" id="projects">
      <div className="mx-auto max-w-7xl space-y-12">
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
