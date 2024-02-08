import UserDetail from "@/components/User";
import { Suspense } from "react";
import { NavSignIn } from "./NavSignIn";
import Image from "next/image";
import walletLogo from "../../public/wallet_logo.svg";
import { Skeleton } from "./ui/skeleton";
import { HeaderLookupForm } from "./UserLookupForm";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex w-full flex-row-reverse flex-wrap-reverse items-center gap-4 p-4 md:flex-wrap">
      <div className="flex flex-1 flex-row-reverse items-center gap-4 text-right">
        <Suspense
          fallback={
            <Skeleton className="h-9 w-96 flex-1 items-center"></Skeleton>
          }
        >
          <NavSignIn />
          <UserDetail />
        </Suspense>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/">
          <Image
            src={walletLogo}
            alt="PatchWallet"
            className="cursor-pointer md:block"
            width={168}
          />
        </Link>
        <HeaderLookupForm />
      </div>
    </nav>
  );
}
