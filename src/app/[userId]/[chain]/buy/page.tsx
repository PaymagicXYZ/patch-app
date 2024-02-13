import { UserId } from "@patchwallet/patch-sdk";
import { MoonPay } from "./MoonPay";
import { resolve } from "@/libs/actions/resolve";
export default async function Page({
  params,
}: {
  params: { userId: string; chain: string };
}) {
  const userId = decodeURIComponent(params.userId) as UserId;
  const chain = params.chain;
  const walletAddress = (await resolve(userId)) as string;
  return (
    <main className="m-4">
      {walletAddress && <MoonPay walletAddress={walletAddress} chain={chain} />}
    </main>
  );
}
