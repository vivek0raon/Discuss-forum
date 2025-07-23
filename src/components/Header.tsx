import React, { Suspense } from "react";
import AuthHeader from "./auth-header";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <div className="flex flex-col sm:grid sm:grid-cols-4 h-auto sm:h-16 items-center gap-2 sm:gap-0 py-2 sm:py-0">
      <div className="flex justify-center sm:justify-start order-1 sm:order-1">
        <Link href={"/"}>
          <h1 className="text-xl sm:text-2xl font-bold">Discuss</h1>
        </Link>
      </div>
      <div className="flex sm:col-span-2 justify-center sm:justify-between order-3 sm:order-2 w-full sm:w-auto">
        <Suspense
          fallback={
            <div className="h-8 bg-muted animate-pulse rounded w-full max-w-md" />
          }
        >
          <SearchInput />
        </Suspense>
      </div>
      <div className="flex justify-center sm:justify-end gap-2 items-center order-2 sm:order-3">
        <ModeToggle />
        <AuthHeader />
      </div>
    </div>
  );
};

export default Header;
