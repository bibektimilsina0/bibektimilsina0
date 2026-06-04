import HeaderSection from "@/components/dashboard/HeaderSection";
import AddTechCategory from "@/components/dashboard/tech-stack/AddTechCategory";
import TechCategoryListDashboard from "@/components/dashboard/tech-stack/TechCategoryListDashboard";
import { getTechCategories } from "@/lib/actions/tech-stack";

export const dynamic = "force-dynamic";

export default async function TechStackManagementPage() {
  const categories = await getTechCategories();

  return (
    <div className="min-h-[calc(100vh-8rem)] w-full bg-background px-4 py-6 md:px-6 md:py-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <HeaderSection
          title="Manage Tech Stack"
          description="Create, update, and reorder the technology categories and skills on your portfolio."
          variant="bold"
          dialogAction={<AddTechCategory />}
        />
        <TechCategoryListDashboard initialCategories={categories} />
      </div>
    </div>
  );
}
