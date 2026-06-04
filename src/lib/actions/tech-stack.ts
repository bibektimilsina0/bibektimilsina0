/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { TechCategory } from "@/types/content";
import { connectMongoose } from "../connecttodb";
import { TechStackCategoryModel } from "../models/TechStackCategory";
import { DEFAULT_TECH_CATEGORIES } from "../defaults";
import { revalidatePath } from "next/cache";

export async function getTechCategories(): Promise<TechCategory[]> {
  try {
    await connectMongoose();

    // Seed defaults on first read so the site is unchanged and cards editable.
    const count = await TechStackCategoryModel.countDocuments().exec();
    if (count === 0) {
      await TechStackCategoryModel.insertMany(DEFAULT_TECH_CATEGORIES);
    }

    const docs = await TechStackCategoryModel.find({})
      .sort({ id: 1 })
      .lean()
      .exec();
    return JSON.parse(JSON.stringify(docs)) as TechCategory[];
  } catch (error) {
    console.error("❌ Error fetching tech categories:", error);
    return [];
  }
}

export async function createTechCategory(data: Omit<TechCategory, "_id">) {
  try {
    await connectMongoose();
    const max = await TechStackCategoryModel.findOne({})
      .sort({ id: -1 })
      .exec();
    const autoId = max ? (Number(max.id) || 0) + 1 : 1;
    const id = data.id && Number(data.id) > 0 ? Number(data.id) : autoId;

    const created = new TechStackCategoryModel({ ...data, id });
    await created.save();

    revalidatePath("/");
    revalidatePath("/dashboard/tech-stack");
    return { success: true, category: JSON.parse(JSON.stringify(created)) };
  } catch (error: any) {
    console.error("❌ Error creating tech category:", error);
    return {
      success: false,
      error: error.message || "Failed to create category",
    };
  }
}

export async function updateTechCategory(
  _id: string,
  data: Partial<TechCategory>,
) {
  try {
    await connectMongoose();
    const updated = await TechStackCategoryModel.findByIdAndUpdate(
      _id,
      { $set: data },
      { new: true },
    ).exec();

    if (!updated) return { success: false, error: "Category not found" };

    revalidatePath("/");
    revalidatePath("/dashboard/tech-stack");
    return { success: true, category: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("❌ Error updating tech category:", error);
    return {
      success: false,
      error: error.message || "Failed to update category",
    };
  }
}

export async function deleteTechCategory(_id: string) {
  try {
    await connectMongoose();
    const deleted = await TechStackCategoryModel.findByIdAndDelete(_id).exec();
    if (!deleted) return { success: false, error: "Category not found" };

    revalidatePath("/");
    revalidatePath("/dashboard/tech-stack");
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error deleting tech category:", error);
    return {
      success: false,
      error: error.message || "Failed to delete category",
    };
  }
}
