/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { Experience } from "@/types/content";
import { connectMongoose } from "../connecttodb";
import { ExperienceModel } from "../models/Experience";
import { DEFAULT_EXPERIENCES } from "../defaults";
import { revalidatePath } from "next/cache";

export async function getExperiences(): Promise<Experience[]> {
  try {
    await connectMongoose();

    // Seed defaults on first read so the site is unchanged and cards editable.
    const count = await ExperienceModel.countDocuments().exec();
    if (count === 0) {
      await ExperienceModel.insertMany(DEFAULT_EXPERIENCES);
    }

    const docs = await ExperienceModel.find({}).sort({ id: 1 }).lean().exec();
    return JSON.parse(JSON.stringify(docs)) as Experience[];
  } catch (error) {
    console.error("❌ Error fetching experiences:", error);
    return [];
  }
}

export async function createExperience(data: Omit<Experience, "_id">) {
  try {
    await connectMongoose();
    const max = await ExperienceModel.findOne({}).sort({ id: -1 }).exec();
    const autoId = max ? (Number(max.id) || 0) + 1 : 1;
    const id = data.id && Number(data.id) > 0 ? Number(data.id) : autoId;

    const created = new ExperienceModel({ ...data, id });
    await created.save();

    revalidatePath("/");
    revalidatePath("/dashboard/experience");
    return { success: true, experience: JSON.parse(JSON.stringify(created)) };
  } catch (error: any) {
    console.error("❌ Error creating experience:", error);
    return {
      success: false,
      error: error.message || "Failed to create experience",
    };
  }
}

export async function updateExperience(_id: string, data: Partial<Experience>) {
  try {
    await connectMongoose();
    const updated = await ExperienceModel.findByIdAndUpdate(
      _id,
      { $set: data },
      { new: true },
    ).exec();

    if (!updated) return { success: false, error: "Experience not found" };

    revalidatePath("/");
    revalidatePath("/dashboard/experience");
    return { success: true, experience: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("❌ Error updating experience:", error);
    return {
      success: false,
      error: error.message || "Failed to update experience",
    };
  }
}

export async function deleteExperience(_id: string) {
  try {
    await connectMongoose();
    const deleted = await ExperienceModel.findByIdAndDelete(_id).exec();
    if (!deleted) return { success: false, error: "Experience not found" };

    revalidatePath("/");
    revalidatePath("/dashboard/experience");
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error deleting experience:", error);
    return {
      success: false,
      error: error.message || "Failed to delete experience",
    };
  }
}
