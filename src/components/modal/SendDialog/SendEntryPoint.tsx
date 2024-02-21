import { SendDialog } from "@/components/modal/SendDialog/SendDialog";
import { Chain, UserId } from "@patchwallet/patch-sdk";
import { SendDialogTrigger } from "./SendDialogTrigger";
import { currentUser } from "@clerk/nextjs";
import isAuthed from "@/libs/utils/isAuthed";
import { resolveSocialProfile } from "@/libs/actions/utils";
import { fetchTokenBalance } from "@/libs/actions/tokens";
import { ChooseRecipientSection } from "../../../app/[userId]/[chain]/components/ChooseRecipientSection";
import { Separator } from "@/components/ui/separator";
import { ChooseTokensSection } from "../../../app/[userId]/[chain]/components/ChooseTokensSection";
import { DialogNonAuth } from "../../../app/[userId]/[chain]/components/DialogNonAuth";

export const SendEntryPoint = async ({
  chain,
  userId,
}: {
  chain: Chain;
  userId: UserId;
}) => {
  const _user = await currentUser();
  const authed = _user && isAuthed(userId, _user);
  const { address, profile } = await resolveSocialProfile(userId);

  const whatToVerify =
    profile.network === "tel"
      ? "phone number"
      : profile.network === "email"
      ? "email"
      : "social account";

  const { data } = (await fetchTokenBalance(address, chain, true)) ?? [];
  return (
    <>
      <SendDialogTrigger
        disabled={data.nfts.length === 0 && data.tokens.length === 0}
      />
      <SendDialog
        title={
          !authed
            ? `In order to send you need to first verify your ${whatToVerify}`
            : "Select tokens to send them to an external wallet recipient"
        }
      >
        {authed ? (
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
        )}
      </SendDialog>
    </>
  );
};
