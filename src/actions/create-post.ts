"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib";
import { saveImage, isValidImageFile } from "@/lib/image-upload";
import { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const createTopicSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(5),
});

type createPostFormState = {
  errors: {
    title?: string[];
    content?: string[];
    image?: string[];
    formError?: string[];
  };
};

export const createPost = async (
  slug: string,
  prevState: createPostFormState,
  formData: FormData
): Promise<createPostFormState> => {
  // validation
  const result = createTopicSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Handle image upload
  const imageFile = formData.get("image") as File;
  let imagePath: string | null = null;

  if (imageFile && imageFile.size > 0) {
    // Validate image file
    if (!isValidImageFile(imageFile)) {
      return {
        errors: {
          image: [
            "Please upload a valid image file (JPEG, PNG, GIF, WebP) under 5MB",
          ],
        },
      };
    }

    try {
      imagePath = await saveImage(imageFile);
    } catch {
      return {
        errors: {
          image: ["Failed to upload image. Please try again."],
        },
      };
    }
  }

  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        formError: ["You have to login first"],
      },
    };
  }

  const topic = await prisma.topic.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!topic) {
    return {
      errors: {
        formError: ["Topic not found"],
      },
    };
  }
  let post: Post;
  try {
    post = await prisma.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        image: imagePath,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["Something went wrong"],
        },
      };
    }
  }
  revalidatePath(`/topic/${slug}`);
  redirect(`/topics/${slug}/posts/${post.id}`);
};
