import CommentCreateForm from "@/components/comments/CommentCreateForm";
import CommentList from "@/components/comments/CommentList";
import PostShow from "@/components/posts/PostShow";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

type PostShowPageProps = {
  params: Promise<{ slug: string; postId: string }>;
};

const PostShowPage: React.FC<PostShowPageProps> = async ({ params }) => {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3 p-2 sm:p-4">
      <Link href={`/topics/${slug}`}>
        <Button variant={"link"} className="p-0 h-auto">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm sm:text-base">back to {slug}</span>
        </Button>
      </Link>
      <Suspense
        fallback={
          <div className="space-y-4">
            <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
            <div className="h-48 bg-muted animate-pulse rounded" />
          </div>
        }
      >
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
};

export default PostShowPage;
