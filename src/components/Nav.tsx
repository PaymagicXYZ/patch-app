import UserDetail from "@/components/User";
import { auth, UserButton, SignInButton } from "@clerk/nextjs";
import { Suspense } from "react";

export default function Nav() {
  const { userId } = auth();
  return (
    <nav className="flex flex-row items-end p-2">
      {userId ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton afterSignInUrl={`/user`} />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <UserDetail />
      </Suspense>
    </nav>
  );
}
