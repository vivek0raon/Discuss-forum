import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/PostList";
import { fetchPostByTopicSlug } from "@/lib/query/post";
import { fetchTopicBySlug } from "@/lib/query/topic";
import { notFound } from "next/navigation";
import React from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

const TopicShowPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const slug = (await params).slug;

  // Fetch topic details
  const topic = await fetchTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 p-2 sm:p-4">
      <div className="lg:col-span-3 grid gap-4">
        <div className="space-y-2">
          <h1 className="font-bold text-2xl sm:text-3xl capitalize">
            {topic.slug}
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            {topic.description}
          </p>
        </div>
        <PostList fetchData={() => fetchPostByTopicSlug(slug)} />
      </div>
      <div className="mt-6 lg:mt-0">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
};

export default TopicShowPage;
