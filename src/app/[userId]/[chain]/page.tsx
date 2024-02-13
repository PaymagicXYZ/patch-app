import { Chain, UserId } from "@patchwallet/patch-sdk";
import { resolveSocialProfile } from "@/libs/actions/utils";
import ProfileWidget from "@/components/ProfileWidget";
import { notFound } from "next/navigation";
import { AssetsTab } from "@/components/AssetsTabs";
import { Suspense } from "react";
import { InventoryTabsSkeleton } from "@/components/Skeleton";

export default async function Wallet({
  params,
}: {
  params: { userId: UserId; chain: Chain };
}) {
  const _userId = decodeURIComponent(params.userId);
  const { address, profile } = await resolveSocialProfile(_userId as UserId);

  if (!address) {
    notFound();
  }
  return (
    <main className="flex-1">
      {/* <AlphaBanner /> */}
      <div>
        <div className="relative mx-5 flex h-full flex-col md:mx-10">
          <div className="mb-auto mt-6 flex justify-center md:mt-[108px] ">
            <div className="flex w-full flex-col gap-4 md:w-[600px]">
              <div className="flex basis-0 flex-wrap md:flex-nowrap">
                <ProfileWidget
                  address={address}
                  profile={profile}
                  chain={params.chain}
                  className="w-full"
                />
              </div>
              <div>
                <Suspense fallback={<InventoryTabsSkeleton />}>
                  <AssetsTab address={address} chain={params.chain} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
