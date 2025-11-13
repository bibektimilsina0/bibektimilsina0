import { Project } from "@/types/project";

export async function getProjects(): Promise<Project[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/project`, {
      cache: "no-store", // Ensure fresh data on each request
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.status}`);
    }

    const projects = await response.json();

    // Convert MongoDB _id to string if needed
    return projects.map((project: Project) => ({
      ...project,
      _id: project._id.toString(),
    })) as Project[];
  } catch (error) {
    console.error("❌ Failed to fetch projects:", error);
    return [];
  }
}
