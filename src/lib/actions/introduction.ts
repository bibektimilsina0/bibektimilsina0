/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { Introduction } from "@/types/content";
import { connectMongoose } from "../connecttodb";
import { IntroductionModel } from "../models/Introduction";
import { DEFAULT_INTRODUCTION } from "../defaults";
import { revalidatePath } from "next/cache";

export async function getIntroduction(): Promise<Introduction> {
  try {
    await connectMongoose();
    const doc = await IntroductionModel.findOne({}).lean().exec();
    if (!doc) return DEFAULT_INTRODUCTION;

    const i = JSON.parse(JSON.stringify(doc));
    return {
      _id: i._id,
      label: i.label ?? DEFAULT_INTRODUCTION.label,
      title: i.title ?? "",
      location: i.location ?? "",
      paragraphs: Array.isArray(i.paragraphs) ? i.paragraphs : [],
    };
  } catch (error) {
    console.error("❌ Error fetching introduction:", error);
    return DEFAULT_INTRODUCTION;
  }
}

export async function updateIntroduction(data: Partial<Introduction>) {
  try {
    await connectMongoose();
    const { _id, ...rest } = data;
    void _id;
    const updated = await IntroductionModel.findOneAndUpdate(
      {},
      { $set: rest },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
      .lean()
      .exec();

    revalidatePath("/");
    revalidatePath("/dashboard/introduction");
    return { success: true, introduction: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("❌ Error updating introduction:", error);
    return {
      success: false,
      error: error.message || "Failed to update introduction",
    };
  }
}
