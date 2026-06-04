// src/lib/models/Hero.ts
import mongoose, { Schema, models } from "mongoose";

const HeroSchema = new Schema(
  {
    greeting: { type: String, default: "Hello, I'm" },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    techExpertise: { type: [String], default: [] },
    social: {
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      email: { type: String, default: "" },
      twitter: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const HeroModel = models.Hero || mongoose.model("Hero", HeroSchema);
