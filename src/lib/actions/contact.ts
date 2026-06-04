/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ContactInfo } from "@/types/content";
import { connectMongoose } from "../connecttodb";
import { ContactInfoModel } from "../models/ContactInfo";
import { DEFAULT_CONTACT } from "../defaults";
import { revalidatePath } from "next/cache";

export async function getContact(): Promise<ContactInfo> {
  try {
    await connectMongoose();
    const doc = await ContactInfoModel.findOne({}).lean().exec();
    if (!doc) return DEFAULT_CONTACT;

    const c = JSON.parse(JSON.stringify(doc));
    return {
      _id: c._id,
      heading: c.heading ?? DEFAULT_CONTACT.heading,
      subheading: c.subheading ?? DEFAULT_CONTACT.subheading,
      email: c.email ?? "",
      phone: c.phone ?? "",
      location: c.location ?? "",
    };
  } catch (error) {
    console.error("❌ Error fetching contact info:", error);
    return DEFAULT_CONTACT;
  }
}

export async function updateContact(data: Partial<ContactInfo>) {
  try {
    await connectMongoose();
    const { _id, ...rest } = data;
    void _id;
    const updated = await ContactInfoModel.findOneAndUpdate(
      {},
      { $set: rest },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    )
      .lean()
      .exec();

    revalidatePath("/");
    revalidatePath("/dashboard/contact");
    return { success: true, contact: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("❌ Error updating contact info:", error);
    return {
      success: false,
      error: error.message || "Failed to update contact info",
    };
  }
}
