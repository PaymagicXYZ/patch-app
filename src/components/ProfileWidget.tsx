import { Suspense } from "react";
import ViewAddressBtn from "./ViewAddressBtn";
import ProfileInfo from "./ProfileInfo";
import WidgetContainer from "./WidgetContainer";
import { SocialProfile } from "@/types";
import { Skeleton } from "./ui/skeleton";
import { Address, Chain } from "@patchwallet/patch-sdk";
import { AddressTooltip } from "./AddressTooltip";
import { TotalBalanceUSD } from "./TotalBalance";
import { GenericDialog } from "./GenericDialog";
import { SendDialogContent } from "./SendDialogContent";
import { Separator } from "./ui/separator";
import { cn } from "@/utils";
import Link from "next/link";

async function ProfileWidget({
  address,
  profile,
  chain,
  className,
}: {
  address: Address;
  profile: SocialProfile;
  chain: Chain;
  className?: string;
}) {
  const whatToVerify =
    profile?.network === "tel"
      ? "phone number"
      : profile?.network === "email"
      ? "email"
      : "social account";
  return (
    <WidgetContainer className={cn("", className)}>
      {/*For testing purposes */}
      <Link
        href={`/success?txHash=0x8f9c8d8347a909e0c7d6bf79087fcda0e298519fc0bd2f3055f8c82792bfb28f&userId=${profile.patchUserId}`}
      >
        Go
      </Link>
      <div className="flex justify-between">
        {address && <ProfileInfo profile={profile} checkMark />}
        <ViewAddressBtn
          disabled={!address}
          url={`https://polygonscan.com/address/${address}`}
          text="Block Explorer"
        />
      </div>

      <div className="mt-8 flex w-full flex-col items-center justify-center">
        <p className="text-sm leading-7 text-gray-700">TOTAL BALANCE</p>
        <Suspense fallback={<Skeleton className="my-1 h-10 w-32 mb-4" />}>
          <TotalBalanceUSD address={address} chain={chain} />
        </Suspense>
        <AddressTooltip address={address} />
      </div>
      <div className="mt-7 flex justify-end px-4">
        <GenericDialog
          title="Send"
          subtitle={`In order to send you need to first verify your ${whatToVerify}`}
        >
          <Separator />
          <Suspense fallback={<Skeleton className="h-80 w-96" />}>
            <SendDialogContent
              profile={profile}
              chain={chain}
              address={address}
            />
          </Suspense>
          {/* <Separator className="mt-4" /> */}
        </GenericDialog>
      </div>
    </WidgetContainer>
  );
}

export default ProfileWidget;
