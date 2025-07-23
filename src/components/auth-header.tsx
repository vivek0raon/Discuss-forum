"use client";
import { useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/actions/sign-in";
import { signOut } from "@/actions/sign-out";
// import { auth } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ChevronDown, LogOut } from "lucide-react";
import { Separator } from "./ui/separator";

const AuthHeader = () => {
  const session = useSession();
  let authContent: React.ReactNode;

  if (session.status === "loading") {
    return null;
  }

  if (session.data?.user) {
    {
      authContent = (
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center cursor-pointer gap-2">
              <Avatar className="size-10">
                <AvatarImage
                  src={session.data.user.image || ""}
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ChevronDown />
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <h1>{session.data.user.name}</h1>
            <Separator className="my-2" />
            <form action={signOut}>
              <Button type="submit">
                <LogOut /> Sign Out
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      );
    }
  } else {
    authContent = (
      <>
        <form action={signIn}>
          <Button variant={"outline"}>Sign In</Button>
        </form>
        <form action={signIn}>
          <Button>Sign up</Button>
        </form>
      </>
    );
  }

  return authContent;
};

export default AuthHeader;
