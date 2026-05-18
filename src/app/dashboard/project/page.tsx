import HeaderSection from "@/components/dashboard/HeaderSection";
import AddNewProject from "@/components/dashboard/project/AddNewProject";
import ProjectListDashboard from "@/components/dashboard/project/ProjectListDashboard";
import { getProjects } from "@/lib/actions/projects";
// app/dashboard/project/page.tsx (or layout.tsx)
export const dynamic = "force-dynamic";
export default async function ProjectManagementPage() {
  const projects = await getProjects();

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full bg-background px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <HeaderSection
          title="Manage Projects"
          description="Create, update, and manage your portfolio projects showcase."
          variant="bold"
          dialogAction={<AddNewProject />}
        />

        <ProjectListDashboard initialProjects={projects} />
      </div>
    </div>
  );
}
