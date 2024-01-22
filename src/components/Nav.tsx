import UserDetail from "@/components/User";
import { UserButton } from "@clerk/nextjs";

export default function Nav() {
  return (
    <nav className="flex flex-row items-right p-2">
      <UserButton afterSignOutUrl="/" />
      <UserDetail />
    </nav>
  );
}
