// src/lib/models/Project.ts
import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    projectTitle: { type: String },
    projectDescription: { type: String },
    projectLink: { type: String },
    githubLink: { type: String },
    preview: { type: String },
    technologies: { type: String }, // store comma-separated list
  },
  {
    timestamps: true, // adds createdAt & updatedAt
    versionKey: false,
  }
);

export const ProjectModel =
  models.Project || mongoose.model("Project", ProjectSchema);
