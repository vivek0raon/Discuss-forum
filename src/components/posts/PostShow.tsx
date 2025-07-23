import { prisma } from "@/lib";
import { notFound } from "next/navigation";
import Image from "next/image";
import React from "react";

const PostShow = async ({ postId }: { postId: string }) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });
  if (!post) {
    notFound();
  }
  return (
    <div className="space-y-4">
      <h1 className="font-bold my-2 text-2xl">{post.title}</h1>
      {post.image && (
        <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg border">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <div className="rounded border-2 p-4 bg-card">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
      </div>
    </div>
  );
};

export default PostShow;
