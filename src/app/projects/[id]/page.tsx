import { notFound } from "next/navigation";
import { connectMongoose } from "@/lib/connecttodb";
import { ProjectModel } from "@/lib/models/Project";
import { Project } from "@/types/project";
import ProjectDetail from "@/components/project-detail";

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProject(id: string): Promise<Project | null> {
  try {
    await connectMongoose();
    const project = await ProjectModel.findById(id).lean<Project>().exec();

    if (!project) {
      return null;
    }

    // Convert _id to string
    return {
      ...project,
      _id: project._id.toString(),
    };
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    return null;
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
