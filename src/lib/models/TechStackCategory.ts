// src/lib/models/TechStackCategory.ts
import mongoose, { Schema, models } from "mongoose";

const TechStackCategorySchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    iconName: { type: String, default: "Code2" },
    skills: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TechStackCategoryModel =
  models.TechStackCategory ||
  mongoose.model("TechStackCategory", TechStackCategorySchema);
