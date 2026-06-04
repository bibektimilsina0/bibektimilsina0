// src/lib/models/Introduction.ts
import mongoose, { Schema, models } from "mongoose";

const IntroductionSchema = new Schema(
  {
    label: { type: String, default: "Introduction" },
    title: { type: String, default: "" },
    location: { type: String, default: "" },
    paragraphs: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const IntroductionModel =
  models.Introduction || mongoose.model("Introduction", IntroductionSchema);
