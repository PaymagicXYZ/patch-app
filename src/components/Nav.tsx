import UserDetail from "@/components/User";
import { auth, UserButton, SignInButton } from "@clerk/nextjs";

export default function Nav() {
  const { userId } = auth();
  return (
    <nav className="flex flex-row items-right p-2">
      {userId ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton afterSignInUrl={`/user`} />
      )}
      <UserDetail />
    </nav>
  );
}
