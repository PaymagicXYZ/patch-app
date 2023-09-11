import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserButton afterSignOutUrl="/" />
      <Link href="/user">Check User Object</Link>
      <Link href="/getJWT">Get JWT Token</Link>
    </main>
  );
}
