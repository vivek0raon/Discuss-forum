import { put } from '@vercel/blob';

export async function saveImage(image: File): Promise<string> {
  try {
    // Check if BLOB_READ_WRITE_TOKEN is available
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('Missing BLOB_READ_WRITE_TOKEN environment variable');
      throw new Error('Blob storage configuration missing');
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const extension = image.name.split('.').pop() || 'jpg';
    const filename = `discuss-forum/${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`;

    console.log('Uploading to Vercel Blob...');
    
    // Upload to Vercel Blob
    const blob = await put(filename, image, {
      access: 'public',
    });

    console.log('Upload successful:', blob.url);
    return blob.url;
  } catch (error) {
    console.error("Vercel Blob upload error:", error);
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
