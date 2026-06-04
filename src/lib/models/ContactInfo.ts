// src/lib/models/ContactInfo.ts
import mongoose, { Schema, models } from "mongoose";

const ContactInfoSchema = new Schema(
  {
    heading: { type: String, default: "" },
    subheading: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactInfoModel =
  models.ContactInfo || mongoose.model("ContactInfo", ContactInfoSchema);
