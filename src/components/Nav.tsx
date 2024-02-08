import UserDetail from "@/components/User";
import { Suspense } from "react";
import { NavSignIn } from "./NavSignIn";
import Image from "next/image";
import walletLogo from "../../public/wallet_logo.svg";
import { Skeleton } from "./ui/skeleton";

export default function Nav() {
  return (
    <nav className="flex w-full flex-row-reverse items-center gap-4 p-4">
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
      <div>
        <Image
          src={walletLogo}
          alt="PatchWallet"
          className="hidden cursor-pointer md:block"
          width={168}
        />
      </div>
    </nav>
  );
}
