import Landing from "@/components/landing";
import Intro from "@/components/intro";
import ProjectsList from "@/components/projects-list";
import WorkExperience from "@/components/work-experience";
import Contact from "@/components/contact";
import TechStack from "@/components/tech-stack";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background font-sans max-w-7xl mx-auto">
      <main className="flex min-h-screen w-full flex-col items-center justify-between py-12  bg-background sm:items-start">
        <Landing />
        <Intro />
        {/* <TechExpertise /> */}
        <TechStack />
        <ProjectsList />
        <WorkExperience />
        <Contact />
        {/* <CVDownload /> */}
      </main>
    </div>
  );
}
