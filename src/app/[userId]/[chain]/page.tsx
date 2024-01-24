import { TokenBalance } from "@/components/TokenBalance";
import { NFTBalance } from "@/components/NFTBalance";
import { isSupportedChain } from "@/utils/chain";
import isUserId from "@/utils/checkUserId";
import { Chain } from "@patchwallet/patch-sdk";
import { redirect } from "next/navigation";

export default function Page({
  params,
}: {
  params: { userId: string; chain: string };
}) {
  const userId = decodeURIComponent(params.userId);
  const chain = params.chain;
  if (isUserId(userId) && isSupportedChain(chain)) {
    return (
      <main className="m-4">
        <TokenBalance wallet={userId} chain={chain as Chain} />
        <NFTBalance wallet={userId} chain={chain as Chain} />
      </main>
    );
  } else {
    redirect("/user");
  }
}
