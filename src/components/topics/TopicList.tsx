import { fetchTopic } from "@/lib/query/topic";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopicList = async () => {
  const topics = await fetchTopic();
  return (
    <div className="pt-5">
      <h2 className="text-lg font-semibold mb-3 text-muted-foreground">
        Topics
      </h2>
      <div className="flex flex-col gap-3">
        {topics.map((topic) => (
          <div key={topic.slug} className="flex gap-2 items-center">
            <Bookmark className="cursor-pointer w-4 h-4 flex-shrink-0" />
            <Link href={`/topics/${topic.slug}`} className="flex-1">
              <h1 className="text-sm sm:text-base lg:text-lg hover:text-primary transition-colors capitalize truncate">
                {topic.slug}
              </h1>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicList;
