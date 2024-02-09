import UserDetail from "@/components/layout/User";
import { Suspense } from "react";
import { NavSignIn } from "./NavSignIn";
import Image from "next/image";
import walletLogo from "../../../public/wallet_logo.svg";
import { HeaderLookupForm } from "../UserLookupForm";
import Link from "next/link";
import { HeaderSkeleton } from "../Skeleton";
import AlphaBanner from "./AlphaBanner";

export default function Nav() {
  return (
    <>
      <AlphaBanner />
      <nav className="flex w-full flex-row-reverse flex-wrap-reverse items-center gap-4 p-4 pt-16 md:flex-wrap md:pt-12">
        <div className="flex flex-1 flex-row-reverse items-center gap-4 text-right">
          <Suspense fallback={<HeaderSkeleton />}>
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
    </>
  );
}
