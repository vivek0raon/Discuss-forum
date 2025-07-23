import React from "react";
import CommentShow from "./CommentShow";
import { fetchCommentByPostId } from "@/lib/query/comment";

const CommentList = async ({ postId }: { postId: string }) => {
  const comments = await fetchCommentByPostId(postId);

  const topLevelComment = comments.filter(
    (comment) => comment.parentId === null
  );
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-base sm:text-lg">
        All {topLevelComment.length} Comments
      </h1>
      <div className="space-y-3">
        {topLevelComment.map((comment) => (
          <CommentShow
            key={comment.id}
            postId={comment.postId}
            commentId={comment.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;
