// src/lib/mongoose.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI)
  throw new Error("❌ Missing MONGODB_URI in environment variables");

let isConnected = false;

export const connectMongoose = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: process.env.MONGODB_DB || "Portfolio",
    });
    isConnected = true;
    console.log("✅ MongoDB connected via Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
