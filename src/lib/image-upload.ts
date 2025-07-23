import { writeFile } from "fs/promises";
import { join } from "path";

export async function saveImage(image: File): Promise<string> {
  // Create unique filename
  const timestamp = Date.now();
  const extension = image.name.split(".").pop();
  const filename = `${timestamp}-${Math.random()
    .toString(36)
    .substring(2)}.${extension}`;

  // Convert file to buffer
  const bytes = await image.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Save to public/uploads directory
  const path = join(process.cwd(), "public/uploads", filename);
  await writeFile(path, buffer);

  // Return the public URL path
  return `/uploads/${filename}`;
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
