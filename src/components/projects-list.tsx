import { Separator } from "@/components/ui/separator";
import ProjectsListClient from "@/components/projects-list-client";
import { connectMongoose } from "@/lib/connecttodb";
import { ProjectModel } from "@/lib/models/Project";
import { Project } from "@/types/project";
import TextReveal from "./fancy/text-reveal";

async function getProjects() {
  let projects: Project[] = [];
  try {
    await connectMongoose();
    const projectsData = await ProjectModel.find({})
      .sort({ id: -1 })
      .lean()
      .exec();

    // Convert MongoDB documents to plain objects
    projects = projectsData.map((project: unknown): Project => {
      const p = project as Partial<Project> & { _id?: unknown; id?: string };
      return {
        ...(p as Project),
        id: p.id ?? 0,
        title: p.title ?? "",
        description: p.description ?? "",
        _id: p._id ? String(p._id) : "",
      };
    });
    return projects;
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return [];
  }
}

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
