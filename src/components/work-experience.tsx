import { getExperiences } from "@/lib/actions/experience";
import WorkExperienceContent from "./work-experience-content";

export default async function WorkExperience() {
  const experiences = await getExperiences();
  return <WorkExperienceContent experiences={experiences} />;
}
