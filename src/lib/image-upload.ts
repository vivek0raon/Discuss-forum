import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function saveImage(image: File): Promise<string> {
  try {
    // Check if environment variables are loaded
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Missing Cloudinary environment variables:", {
        cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
        api_key: !!process.env.CLOUDINARY_API_KEY,
        api_secret: !!process.env.CLOUDINARY_API_SECRET,
      });
      throw new Error("Cloudinary configuration missing");
    }

    // Convert file to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Data = buffer.toString("base64");
    const dataURI = `data:${image.type};base64,${base64Data}`;

    console.log("Uploading to Cloudinary...");

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "discuss-forum", // Optional: organize uploads in a folder
      resource_type: "auto",
    });

    console.log("Upload successful:", result.secure_url);
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image");
  }
}

export function isValidImageFile(file: File): boolean {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  const maxSize = 5 * 1024 * 1024; // 5MB

  return allowedTypes.includes(file.type) && file.size <= maxSize;
}
