import PostList from "@/components/posts/PostList";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import TopicList from "@/components/topics/TopicList";
import { fetchTopPost } from "@/lib/query/post";

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3 pr-4 border-r border-border">
        <h1 className="text-xl font-bold m-2">Trending Post</h1>
        <PostList fetchData={fetchTopPost} />
      </div>
      <div className="pl-4">
        <div className="flex">
          <div className="flex flex-col">
            <TopicCreateForm />
            <TopicList />
          </div>
        </div>
      </div>
    </div>
  );
}
