"use client";
import React from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { search } from "@/actions/search";
import { Search } from "lucide-react";

const SearchInput = () => {
  const searchParams = useSearchParams();
  return (
    <form
      action={search}
      className="w-full max-w-md flex items-center border border-gray-300 rounded-2xl px-2"
    >
      <Input
        defaultValue={searchParams.get("term") || ""}
        type="text"
        name="term"
        placeholder="Search posts..."
        className="border-0 shadow-none focus-visible:ring-0 text-sm"
      />
      <button type="submit" className="ml-2">
        <Search className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
      </button>
    </form>
  );
};

export default SearchInput;
