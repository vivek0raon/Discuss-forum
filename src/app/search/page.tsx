import PostList from "@/components/posts/PostList";
import { fetchPostBySearch } from "@/lib/query/post";
import React from "react";

// Force dynamic rendering
export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<{ term: string }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const term = (await searchParams).term;
  return (
    <div className="p-2 sm:p-4">
      <h1 className="text-base sm:text-lg text-blue-600 font-medium italic mb-4">
        Search Results for &ldquo;{term}&rdquo;
      </h1>
      <PostList fetchData={() => fetchPostBySearch(term)} />
    </div>
  );
};

export default SearchPage;
