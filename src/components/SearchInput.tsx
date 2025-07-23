"use client";
import React from "react";
import { Input } from "./ui/input";
import { useSearchParams } from "next/navigation";
import { search } from "@/actions/search";
import { Search } from "lucide-react";

const SearchInput = () => {
  const searchParams = useSearchParams();
  return (
    <form action={search} className="w-full flex items-center border border-gray-300 rounded-2xl px-2">
      <Input
        defaultValue={searchParams.get("term") || ""}
        type="text"
        name="term"
        placeholder="Search post..."
        className="border-0 shadow-none focus-visible:ring-0"
      />
      <button type="submit" className="ml-2">
        <Search className="cursor-pointer" />
      </button>
    </form>
  );
};

export default SearchInput;
