"use server";
import { currentUser } from "@clerk/nextjs/server";
import isAuthed from "@/libs/utils/isAuthed";
import { Chain, UserId } from "@patchwallet/patch-sdk";
import { Separator } from "../../../../components/ui/separator";
import { ChooseTokensSection } from "./ChooseTokensSection";
import { formatUnits } from "viem";
import { sortCovalentAssetsByType } from "@/libs/utils";
import { resolveSocialProfile } from "@/libs/actions/utils";
import { ChooseRecipientSection } from "./ChooseRecipientSection";
import { DialogNonAuth } from "./DialogNonAuth";
import { fetchTokenBalance } from "@/libs/actions/tokens";

export async function SendDialogContent({
  chain,
  userId,
}: {
  chain: Chain;
  userId: UserId;
}) {
  const _user = await currentUser();
  const authed = _user && isAuthed(userId, _user);
  const { address, profile } = await resolveSocialProfile(userId);

  const { data } = (await fetchTokenBalance(address, chain, true)) ?? [];

  return authed ? (
    <div className="flex flex-col">
      <ChooseRecipientSection />
      <Separator className="my-4" />
      <ChooseTokensSection
        profile={profile}
        tokens={data.tokens}
        nfts={data.nfts}
      />
    </div>
  ) : (
    <DialogNonAuth chain={chain} profile={profile} />
  );
}
