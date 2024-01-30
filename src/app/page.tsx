import WalletBanner from "@/components/WalletBanner";
import Link from "next/link";
import Image from "next/image";
import walletLogo from "../../public/wallet_logo.svg";
import { Input } from "@/components/ui/input";
import { SelectSocialProvider } from "@/components/SelectSocialProvider";
import { SearchUser } from "@/components/UserLookupForm";

export default function Home() {
  return (
    <main className="mt-10 flex flex-col items-center">
      {/* <Link href="/user">To My Wallets</Link> */}
      <Image src={walletLogo}
              alt="PatchWallet"
              className="cursor-pointer"
              width={168} />
      <WalletBanner type="about"></WalletBanner>
      <p className="mt-4 text-center text-sm text-gray-600 md:w-[475px]">
              Use your Twitter, Email, or Phone as your personal crypto wallet
              without the complexity. Let anyone send you tokens via your social
              handle.
      </p>
      <div className="flex w-full justify-center pt-9" >
        <SearchUser className="w-full md:w-3/4" />
      </div>
  </main>
  );
}

