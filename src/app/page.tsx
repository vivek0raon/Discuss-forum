import PostList from "@/components/posts/PostList";
import TopicCreateForm from "@/components/topics/TopicCreateForm";
import TopicList from "@/components/topics/TopicList";
import { fetchTopPost } from "@/lib/query/post";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 p-2 sm:p-4">
      <div className="lg:col-span-3 lg:pr-4 lg:border-r lg:border-border">
        <h1 className="text-lg sm:text-xl font-bold m-2">Trending Posts</h1>
        <PostList fetchData={fetchTopPost} />
      </div>
      <div className="lg:pl-4 mt-6 lg:mt-0">
        <div className="flex flex-col space-y-4">
          <TopicCreateForm />
          <TopicList />
        </div>
      </div>
    </div>
  );
}
