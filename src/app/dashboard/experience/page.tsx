import HeaderSection from "@/components/dashboard/HeaderSection";
import AddExperience from "@/components/dashboard/experience/AddExperience";
import ExperienceListDashboard from "@/components/dashboard/experience/ExperienceListDashboard";
import { getExperiences } from "@/lib/actions/experience";

export const dynamic = "force-dynamic";

export default async function ExperienceManagementPage() {
  const experiences = await getExperiences();

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full bg-background px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <HeaderSection
          title="Manage Work Experience"
          description="Create, update, and reorder the roles shown on your experience timeline."
          variant="bold"
          dialogAction={<AddExperience />}
        />
        <ExperienceListDashboard initialExperiences={experiences} />
      </div>
    </div>
  );
}
