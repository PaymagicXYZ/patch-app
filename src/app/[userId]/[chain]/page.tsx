import { currentUser, auth } from "@clerk/nextjs";
import { TokenBalance } from "@/components/TokenBalance";
import { NFTBalance } from "@/components/NFTBalance";
import { isSupportedChain } from "@/utils/chain";
import isUserId from "@/utils/checkUserId";
import isAuthed from "@/utils/isAuthed";
import { Chain } from "@patchwallet/patch-sdk";
import { redirect } from "next/navigation";
import { User } from "@clerk/nextjs/server";
import { SignBtn } from "@/components/SignBtn";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { userId: string; chain: string };
}) {
  const userId = decodeURIComponent(params.userId);
  const chain = params.chain;

  if (isUserId(userId) && isSupportedChain(chain)) {
    const user: User | null = await currentUser();
    const { getToken } = auth();
    const token = (await getToken({ template: "patchwallet" })) || "";
    return (
      <main className="m-4">
        <TokenBalance wallet={userId} chain={chain as Chain} />
        <NFTBalance wallet={userId} chain={chain as Chain} />
        {user && isAuthed(userId, user) && (
          <>
            <SignBtn userId={userId} token={token} />
            <Link href={`/${userId}/${chain}/buy`}>Buy some tokens</Link>
          </>
        )}
      </main>
    );
  } else {
    redirect("/user");
  }
}
