import { Chain, UserId } from "@patchwallet/patch-sdk";
import ProfileWidget from "@/app/[userId]/[chain]/components/ProfileWidget";
import { AssetsTab } from "@/app/[userId]/[chain]/components/AssetsTabs";
import { Suspense } from "react";
import { InventoryTabsSkeleton } from "@/components/Skeleton";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Wallet({
  params,
}: {
  params: { userId: UserId; chain: Chain };
}) {
  const _userId = decodeURIComponent(params.userId);

  return (
    <main className="flex-1">
      <div>
        <div className="relative mx-5 flex h-full flex-col md:mx-10">
          <div className="mb-auto mt-6 flex justify-center md:mt-[108px] ">
            <div className="flex w-full flex-col gap-4 md:w-[600px]">
              <div className="flex basis-0 flex-col flex-wrap md:flex-nowrap">
                <Suspense
                  fallback={
                    <div className="h-[328px] w-full rounded-2xl bg-gray-900 md:w-[600px]"></div>
                  }
                >
                  <ProfileWidget
                    userId={_userId as UserId}
                    chain={params.chain}
                    className="w-full"
                  />
                </Suspense>
              </div>
              <div>
                <Suspense fallback={<InventoryTabsSkeleton />}>
                  <AssetsTab chain={params.chain} userId={_userId as UserId} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
