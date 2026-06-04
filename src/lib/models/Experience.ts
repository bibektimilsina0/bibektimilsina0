// src/lib/models/Experience.ts
import mongoose, { Schema, models } from "mongoose";

const ExperienceSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    company: { type: String, required: true },
    position: { type: String, default: "" },
    location: { type: String, default: "" },
    duration: { type: String, default: "" },
    type: { type: String, default: "Full-time" },
    description: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ExperienceModel =
  models.Experience || mongoose.model("Experience", ExperienceSchema);
