import React from "react";
import CommentShow from "./CommentShow";
import { fetchCommentByPostId } from "@/lib/query/comment";

const CommentList = async ({ postId }: { postId: string }) => {
  const comments = await fetchCommentByPostId(postId);

  const topLevelComment = comments.filter(
    (comment) => comment.parentId === null
  );
  return (
    <div>
      <h1 className="font-bold text-lg">All 0 Comments</h1>
      {topLevelComment.map((comment) => (
        <CommentShow
          key={comment.id}
          postId={comment.postId}
          commentId={comment.id}
        />
      ))}
    </div>
  );
};

export default CommentList;
