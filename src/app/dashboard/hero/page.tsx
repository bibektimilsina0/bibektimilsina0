import HeaderSection from "@/components/dashboard/HeaderSection";
import HeroForm from "@/components/dashboard/hero/HeroForm";
import { getHero } from "@/lib/actions/hero";

export const dynamic = "force-dynamic";

export default async function HeroManagementPage() {
  const hero = await getHero();

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full bg-background px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <HeaderSection
          title="Manage Hero Section"
          description="Edit the home page greeting, name, profile photo, social links, and tech expertise badges."
          variant="bold"
        />
        <HeroForm hero={hero} />
      </div>
    </div>
  );
}
