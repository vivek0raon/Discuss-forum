import React, { Suspense } from "react";
import AuthHeader from "./auth-header";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  // const session = await auth();
  return (
    <div className="grid grid-cols-4 h-16 items-center">
      <div className="flex justify-start">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">Discuss</h1>
        </Link>
      </div>
      <div className="flex col-span-2 justify-between">
        <Suspense>
          <SearchInput />
        </Suspense>
      </div>
      <div className="flex justify-end gap-2 items-center">
        <ModeToggle />
        <AuthHeader />
      </div>
    </div>
  );
};

export default Header;
