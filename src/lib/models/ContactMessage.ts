// src/lib/models/ContactMessage.ts
// Submissions from the public contact form. Stored so a message is never lost
// even if email delivery fails.
import mongoose, { Schema, models } from "mongoose";

const ContactMessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, default: "" },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactMessageModel =
  models.ContactMessage ||
  mongoose.model("ContactMessage", ContactMessageSchema);
