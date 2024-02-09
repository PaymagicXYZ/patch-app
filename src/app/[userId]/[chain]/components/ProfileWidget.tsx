import { Suspense } from "react";
import ViewAddressBtn from "../../../../components/ViewAddressBtn";
import ProfileInfo from "./ProfileInfo";
import WidgetContainer from "../../../../components/WidgetContainer";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Chain, UserId } from "@patchwallet/patch-sdk";
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

  const whatToVerify =
    network === "tel"
      ? "phone number"
      : network === "email"
      ? "email"
      : "social account";

  return (
    <WidgetContainer className={cn("", className)}>
      {/*For testing purposes */}
      {/* <Link
        href={`/success?txHash=0x8f9c8d8347a909e0c7d6bf79087fcda0e298519fc0bd2f3055f8c82792bfb28f&userId=${profile.patchUserId}`}
      >
        Go
      </Link> */}

      <Suspense fallback={<ProfileWidgetHeaderSkeleton />}>
        <ProfileWidgetHeader userId={userId} />
      </Suspense>

      <div className="mt-8 flex w-full flex-col items-center justify-center">
        <p className="text-sm leading-7 text-gray-700">TOTAL BALANCE</p>
        <Suspense fallback={<ProfileWidgetMidSectionSkeleton />}>
          <ProfileWidgetMiddle chain={chain} userId={userId} />
        </Suspense>
      </div>
      <div className="mt-7 flex justify-end px-4">
        <GenericDialog
          dialogId="sendDialog"
          btnTitle="Send"
          title="Send"
          subtitle={`In order to send you need to first verify your ${whatToVerify}`}
          leftIcon={<ArrowUp />}
        >
          <Separator />
          <Suspense fallback={<Skeleton className="h-80 w-96" />}>
            <SendDialogContent chain={chain} userId={userId} />
          </Suspense>
        </GenericDialog>
      </div>
    </WidgetContainer>
  );
}

async function ProfileWidgetHeader({ userId }: { userId: UserId }) {
  const { address, profile } = await resolveSocialProfile(userId as UserId);
  return (
    <div className="flex flex-wrap justify-between">
      <ProfileInfo profile={profile} checkMark />
      <ViewAddressBtn
        disabled={!address}
        url={`https://polygonscan.com/address/${address}`}
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
  const { address } = await resolveSocialProfile(userId as UserId);
  return (
    <div className="flex flex-col items-center justify-center">
      <TotalBalanceUSD address={address} chain={chain} />
      <AddressTooltip address={address} />
    </div>
  );
}

export default ProfileWidget;
