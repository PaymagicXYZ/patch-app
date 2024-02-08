"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export function NavSignIn() {
  const pathname = usePathname();
  return (
    <>
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl={`/${pathname}`} />
      </SignedOut>
    </>
  );
}
