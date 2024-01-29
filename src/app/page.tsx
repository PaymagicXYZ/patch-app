import WalletBanner from "@/components/WalletBanner";
import Link from "next/link";
import Image from "next/image";
import walletLogo from "../../public/wallet_logo.svg";

export default function Home() {
  return (
    <main className="flex flex-col items-center mt-10">
      {/* <Link href="/user">To My Wallets</Link> */}
      <Image src={walletLogo}
              alt="PatchWallet"
              className="cursor-pointer"
              width={168} />
      <WalletBanner type="about"></WalletBanner>
      <p className="md:w-[475px] text-center text-gray-600 text-sm mt-[18px]">
              Use your Twitter, Email, or Phone as your personal crypto wallet
              without the complexity. Let anyone send you tokens via your social
              handle.
            </p>
    </main>
  );
}
