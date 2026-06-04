/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { Hero } from "@/types/content";
import { connectMongoose } from "../connecttodb";
import { HeroModel } from "../models/Hero";
import { DEFAULT_HERO } from "../defaults";
import { revalidatePath } from "next/cache";

export async function getHero(): Promise<Hero> {
  try {
    await connectMongoose();
    const doc = await HeroModel.findOne({}).lean().exec();
    if (!doc) return DEFAULT_HERO;

    const h = JSON.parse(JSON.stringify(doc));
    return {
      _id: h._id,
      greeting: h.greeting ?? DEFAULT_HERO.greeting,
      firstName: h.firstName ?? "",
      lastName: h.lastName ?? "",
      profileImage: h.profileImage ?? "",
      techExpertise: Array.isArray(h.techExpertise) ? h.techExpertise : [],
      social: { ...DEFAULT_HERO.social, ...(h.social || {}) },
    };
  } catch (error) {
    console.error("❌ Error fetching hero:", error);
    return DEFAULT_HERO;
  }
}

export async function updateHero(data: Partial<Hero>) {
  try {
    await connectMongoose();
    const { _id, ...rest } = data;
    void _id;
    const updated = await HeroModel.findOneAndUpdate(
      {},
      { $set: rest },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
      .lean()
      .exec();

    revalidatePath("/");
    revalidatePath("/dashboard/hero");
    return { success: true, hero: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("❌ Error updating hero:", error);
    return { success: false, error: error.message || "Failed to update hero" };
  }
}
