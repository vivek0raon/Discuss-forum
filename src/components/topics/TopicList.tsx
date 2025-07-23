import { fetchTopic } from "@/lib/query/topic";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopicList = async () => {
  const topics = await fetchTopic();
  return (
    <div className="pt-5 flex flex-col gap-4">
      {topics.map((topic) => (
        <div key={topic.slug} className="flex gap-2">
          <Bookmark className="cursor-pointer" />
          <Link href={`/topics/${topic.slug}`}>
            <h1 className=" text-xl">{topic.slug}</h1>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TopicList;
