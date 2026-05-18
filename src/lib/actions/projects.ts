/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { Project } from "@/types/project";
import { connectMongoose } from "../connecttodb";
import { ProjectModel } from "../models/Project";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  try {
    await connectMongoose();
    const projectsData = await ProjectModel.find({})
      .sort({ id: -1 })
      .lean()
      .exec();

    // Convert MongoDB documents to plain objects
    const projects = projectsData.map((project: unknown): Project => {
      const p = project as Partial<Project> & { _id?: unknown; id?: string };
      return {
        ...(p as Project),
        id: p.id ?? 0,
        title: p.title ?? "",
        description: p.description ?? "",
        _id: p._id ? String(p._id) : "",
        projectType: p.projectType ?? "personal",
      };
    });
    return projects;
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return [];
  }
}

export async function createProject(data: Omit<Project, "_id" | "id">) {
  try {
    await connectMongoose();
    
    // Find the max project id to auto-increment
    const maxProject = await ProjectModel.findOne({}).sort({ id: -1 }).exec();
    const nextId = maxProject ? (Number(maxProject.id) || 0) + 1 : 1;

    // Fallback: Copy projectTitle/projectDescription if standard title/description are empty
    const newProject = new ProjectModel({
      ...data,
      title: data.title || data.projectTitle || "Untitled Project",
      description: data.description || data.projectDescription || "No description provided",
      id: nextId,
    });

    await newProject.save();
    revalidatePath("/dashboard/project");
    revalidatePath("/");
    return { success: true, project: JSON.parse(JSON.stringify(newProject)) };
  } catch (error: any) {
    console.error("❌ Error creating project:", error);
    return { success: false, error: error.message || "Failed to create project" };
  }
}

export async function updateProject(id: string, data: Partial<Project>) {
  try {
    await connectMongoose();

    // Fallback: Copy projectTitle/projectDescription during updates if standard title/description are empty
    const updateData = { ...data };
    if (data.projectTitle && !data.title) {
      updateData.title = data.projectTitle;
    }
    if (data.projectDescription && !data.description) {
      updateData.description = data.projectDescription;
    }

    const updated = await ProjectModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).exec();

    if (!updated) {
      return { success: false, error: "Project not found" };
    }

    revalidatePath("/dashboard/project");
    revalidatePath("/");
    return { success: true, project: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("❌ Error updating project:", error);
    return { success: false, error: error.message || "Failed to update project" };
  }
}

export async function deleteProject(id: string) {
  try {
    await connectMongoose();
    const deleted = await ProjectModel.findByIdAndDelete(id).exec();

    if (!deleted) {
      return { success: false, error: "Project not found" };
    }

    revalidatePath("/dashboard/project");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error deleting project:", error);
    return { success: false, error: error.message || "Failed to delete project" };
  }
}

