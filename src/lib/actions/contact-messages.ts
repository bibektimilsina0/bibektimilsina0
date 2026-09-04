/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
// Read/delete access to public contact-form submissions. Messages are created
// by /api/contact — the dashboard only lists, marks read, and deletes them.
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

import { ContactMessage } from "@/types/content";
import { auth } from "../auth";
import { connectMongoose } from "../connecttodb";
import { ContactMessageModel } from "../models/ContactMessage";

/** Messages contain personal data, so every action here is admin-only. */
async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    await requireSession();
    await connectMongoose();
    const docs = await ContactMessageModel.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    return JSON.parse(JSON.stringify(docs)) as ContactMessage[];
  } catch (error) {
    console.error("❌ Error fetching contact messages:", error);
    return [];
  }
}

export async function markMessageRead(_id: string, read: boolean) {
  try {
    await requireSession();
    await connectMongoose();
    const updated = await ContactMessageModel.findByIdAndUpdate(
      _id,
      { $set: { read } },
      { new: true },
    ).exec();
    if (!updated) return { success: false, error: "Message not found" };

    revalidatePath("/dashboard/messages");
    return { success: true, message: JSON.parse(JSON.stringify(updated)) };
  } catch (error: any) {
    console.error("❌ Error updating contact message:", error);
    return {
      success: false,
      error: error.message || "Failed to update message",
    };
  }
}

export async function deleteContactMessage(_id: string) {
  try {
    await requireSession();
    await connectMongoose();
    const deleted = await ContactMessageModel.findByIdAndDelete(_id).exec();
    if (!deleted) return { success: false, error: "Message not found" };

    revalidatePath("/dashboard/messages");
    return { success: true };
  } catch (error: any) {
    console.error("❌ Error deleting contact message:", error);
    return {
      success: false,
      error: error.message || "Failed to delete message",
    };
  }
}
