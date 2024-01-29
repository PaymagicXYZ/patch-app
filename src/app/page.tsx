import WalletBanner from "@/components/WalletBanner";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/user">To My Wallets</Link>
      <WalletBanner type="about"></WalletBanner>
    </main>
  );
}
