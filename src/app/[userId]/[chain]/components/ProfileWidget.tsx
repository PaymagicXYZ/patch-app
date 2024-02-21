import { Suspense } from "react";
import ViewAddressBtn from "../../../../components/ViewAddressBtn";
import ProfileInfo from "./ProfileInfo";
import WidgetContainer from "../../../../components/WidgetContainer";
import { Address, Chain, UserId } from "@patchwallet/patch-sdk";
import { AddressTooltip } from "../../../../components/AddressTooltip";
import { TotalBalanceUSD } from "./TotalBalance";
import { cn } from "@/libs/utils";
import { resolveSocialProfile } from "@/libs/actions/utils";
import {
  ProfileWidgetHeaderSkeleton,
  ProfileWidgetMidSectionSkeleton,
} from "../../../../components/Skeleton";
import { resolve } from "@/libs/actions/resolve";
import { BLOCK_EXPLORERS } from "@/libs/utils/constants";
import { SendEntryPoint } from "../../../../components/modal/SendDialog/SendEntryPoint";
import { SendDialogTrigger } from "../../../../components/modal/SendDialog/SendDialogTrigger";

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
          <Suspense fallback={<SendDialogTrigger disabled />}>
            <SendEntryPoint chain={chain} userId={userId} />
          </Suspense>
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
