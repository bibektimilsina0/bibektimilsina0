// src/lib/cloudinary.ts
// Cloudinary is the image store for production: serverless hosts mount the app
// read-only, so writing into public/uploads there fails with EROFS.
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const isCloudinaryConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET,
  );

export type UploadResult = {
  secure_url: string;
  public_id: string;
  [key: string]: unknown;
};

export const uploadImage = async (
  file: File,
  folder: string = "portfolio/uploads",
): Promise<UploadResult> => {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "image", folder }, (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload returned no result"));
        } else {
          resolve(result as unknown as UploadResult);
        }
      })
      .end(buffer);
  });
};

export const deleteImage = async (
  publicId: string,
  resourceType: "image" | "raw" | "auto" = "image",
) =>
  new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      { resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );
  });

export default cloudinary;
