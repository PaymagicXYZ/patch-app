"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

export function NavSignIn() {
  const pathname = usePathname();

  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl={pathname} mode="modal">
          <Button className="bg-orange-900 text-orange-100 hover:bg-orange-900/80">
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
