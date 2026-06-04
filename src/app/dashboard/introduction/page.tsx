import HeaderSection from "@/components/dashboard/HeaderSection";
import IntroductionForm from "@/components/dashboard/introduction/IntroductionForm";
import { getIntroduction } from "@/lib/actions/introduction";

export const dynamic = "force-dynamic";

export default async function IntroductionManagementPage() {
  const introduction = await getIntroduction();

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full bg-background px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <HeaderSection
          title="Manage Introduction"
          description="Edit the introduction section heading, title, location, and description paragraphs."
          variant="bold"
        />
        <IntroductionForm introduction={introduction} />
      </div>
    </div>
  );
}
