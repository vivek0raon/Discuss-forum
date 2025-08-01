import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PostWithData } from "@/lib/query/post";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { AvatarCircles } from "../magicui/avatar-circles";
import { fetchCommentByPostId } from "@/lib/query/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type PostListProp = {
  fetchData: () => Promise<PostWithData[]>;
};

// const PostList: React.FC<PostListProp> = async ({ fetchData }) => {
//   const posts = await fetchData();
//   return (
//     <div className="flex flex-col gap-2">
//       {posts.map((post) => (
//         <Link
//           href={`/topics/${post.topic.slug}/posts/${post.id}`}
//           key={post.id}
//         >
//           <Card>
//             <CardHeader>
//               <CardTitle>{post.title}</CardTitle>
//               <CardDescription className="flex items-center justify-between">
//                 <h1>By {post.user.name}</h1>
//                 <div className="flex flex-col gap-3 justify-between">
//                   <AvatarCircles  numPeople={post._count.comments} avatarUrls={avatars} />
//                   <div className="flex gap-1 items-center">
//                     <MessageCircle size={16} />
//                     <h1>{post._count.comments}</h1>
//                     <h1>Comments</h1>
//                   </div>
//                 </div>
//               </CardDescription>
//             </CardHeader>
//           </Card>
//         </Link>
//       ))}
//     </div>
//   );
// };
const PostList: React.FC<PostListProp> = async ({ fetchData }) => {
  const posts = await fetchData();
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 sm:p-12">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold font-mono text-muted-foreground">
            No Posts Found!
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground/70 mt-2">
            Be the first to create a post in this topic.
          </p>
        </div>
      </div>
    );
  }

  const postsWithComments = await Promise.all(
    posts.map(async (post) => {
      const comments = await fetchCommentByPostId(post.id);

      const uniqueUsers = new Map();
      comments.forEach((comment) => {
        if (comment.user.image && !uniqueUsers.has(comment.user.image)) {
          uniqueUsers.set(comment.user.image, {
            imageUrl: comment.user.image,
            profileUrl: `#`,
          });
        }
      });

      const commentAvatars = Array.from(uniqueUsers.values()).slice(0, 5);

      return {
        ...post,
        commentAvatars,
      };
    })
  );

  return (
    <div className="flex flex-col gap-3 sm:gap-4">
      {postsWithComments.map((post) => (
        <Link
          href={`/topics/${post.topic.slug}/posts/${post.id}`}
          key={post.id}
        >
          <Card className="hover:shadow-md transition-shadow">
            {post.image && (
              <div className="relative w-full h-32 sm:h-48 overflow-hidden rounded-t-lg">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg">
                {post.title}
              </CardTitle>
              <CardDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 flex-1">
                  {post.content}
                </p>
                <div className="flex flex-col gap-2 sm:gap-3 sm:justify-between sm:items-end">
                  <AvatarCircles
                    numPeople={post._count.comments}
                    avatarUrls={
                      post.commentAvatars.length > 0 ? post.commentAvatars : []
                    }
                  />
                  <div className="flex gap-1 items-center">
                    <MessageCircle size={14} className="sm:size-4" />
                    <span className="text-xs sm:text-sm">
                      {post._count.comments}
                    </span>
                    <span className="text-xs sm:text-sm">Comments</span>
                  </div>
                </div>
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-2 sm:gap-3 items-center p-3 sm:p-6 pt-0">
              <Avatar className="size-4 sm:size-5">
                <AvatarImage
                  src={post.user.image || ""}
                  alt={post.user.name || "User"}
                />
                <AvatarFallback className="text-xs">
                  {post.user.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-xs text-muted-foreground truncate">
                {post.user.name}
              </h1>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
