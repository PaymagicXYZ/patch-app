import { Suspense } from "react";
import ViewAddressBtn from "../../../../components/ViewAddressBtn";
import ProfileInfo from "./ProfileInfo";
import WidgetContainer from "../../../../components/WidgetContainer";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Address, Chain, UserId } from "@patchwallet/patch-sdk";
import { AddressTooltip } from "../../../../components/AddressTooltip";
import { TotalBalanceUSD } from "./TotalBalance";
import { GenericDialog } from "../../../../components/GenericDialog";
import { SendDialogContent } from "./SendDialogContent";
import { Separator } from "../../../../components/ui/separator";
import { cn } from "@/libs/utils";
import { resolveSocialProfile } from "@/libs/actions/utils";
import {
  ProfileWidgetHeaderSkeleton,
  ProfileWidgetMidSectionSkeleton,
} from "../../../../components/Skeleton";
import { ArrowUp } from "lucide-react";
import { resolve } from "@/libs/actions/resolve";
import { LoadingSpinner } from "@/components/Spinner";
import { BLOCK_EXPLORERS } from "@/libs/utils/constants";

async function ProfileWidget({
  userId,
  chain,
  className,
}: {
  userId: UserId;
  chain: Chain;
  className?: string;
}) {
  const network = userId.split(":")[0];
  const isFarcaster = network === "farcaster";
  const whatToVerify =
    network === "tel"
      ? "phone number"
      : network === "email"
      ? "email"
      : "social account";

  return (
    <WidgetContainer className={cn("", className)}>
      <Suspense fallback={<ProfileWidgetHeaderSkeleton />}>
        <ProfileWidgetHeader userId={userId} chain={chain} />
      </Suspense>

      <div className="mt-8 flex w-full flex-col items-center justify-center">
        <p className="text-sm leading-7 text-gray-700">TOTAL BALANCE</p>
        <Suspense fallback={<ProfileWidgetMidSectionSkeleton />}>
          <ProfileWidgetMiddle chain={chain} userId={userId} />
        </Suspense>
      </div>
      <div className="mt-7 flex justify-center px-4">
        {!isFarcaster ? (
          <GenericDialog
            dialogId="sendDialog"
            btnTitle="Send"
            title="Send"
            subtitle={`In order to send you need to first verify your ${whatToVerify}`}
            leftIcon={<ArrowUp />}
          >
            <Separator />
            <Suspense
              fallback={
                <Skeleton className="flex h-80 w-full items-center justify-center">
                  <LoadingSpinner />
                </Skeleton>
              }
            >
              <SendDialogContent chain={chain} userId={userId} />
            </Suspense>
          </GenericDialog>
        ) : (
          <></>
        )}
      </div>
    </WidgetContainer>
  );
}

async function ProfileWidgetHeader({
  userId,
  chain,
}: {
  userId: UserId;
  chain: Chain;
}) {
  const { address, profile } = await resolveSocialProfile(userId as UserId);
  const blockExplorerUrl = BLOCK_EXPLORERS[chain];

  return (
    <div className="flex flex-wrap justify-between">
      <ProfileInfo profile={profile} checkMark />
      <ViewAddressBtn
        disabled={!address}
        url={`${blockExplorerUrl}/address/${address}`}
        text="Block Explorer"
      />
    </div>
  );
}

async function ProfileWidgetMiddle({
  userId,
  chain,
}: {
  userId: UserId;
  chain: Chain;
}) {
  const address = (await resolve(userId)) as Address;

  return (
    <div className="flex flex-col items-center justify-center">
      <TotalBalanceUSD address={address} chain={chain} />
      <AddressTooltip address={address} />
    </div>
  );
}

export default ProfileWidget;
