import { getTechCategories } from "@/lib/actions/tech-stack";
import TechStackContent from "./tech-stack-content";

export default async function TechStack() {
  const categories = await getTechCategories();
  return <TechStackContent categories={categories} />;
}
