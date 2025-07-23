import { fetchCommentByPostId } from "@/lib/query/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import CommentCreateForm from "./CommentCreateForm";

type CommentShowProps = {
  postId: string;
  commentId: string;
};

const CommentShow = async ({ postId, commentId }: CommentShowProps) => {
  const comments = await fetchCommentByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);
  if (!comment) return null;

  const children = comments.filter((c) => c.parentId === commentId);

  return (
    <div className="m-4 p-4 border">
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={comment.user.image || ""} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-medium">
            {comment.user.name}
          </p>
          <p className="text-foreground">{comment.content}</p>
          <CommentCreateForm postId={comment.postId} parentId={comment.id} />
        </div>
      </div>
      {children.map((comment) => (
        <CommentShow key={comment.id} postId={postId} commentId={comment.id} />
      ))}
    </div>
  );
};

export default CommentShow;
