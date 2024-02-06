import { Chain, UserId } from "@patchwallet/patch-sdk";
import { resolveSocialProfile } from "@/libs/actions/utils";
import ProfileWidget from "@/components/ProfileWidget";
import { notFound } from "next/navigation";
import { auth, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { SignBtn } from "@/components/SignBtn";

export default async function Wallet({
  params,
}: {
  params: { userId: UserId; chain: Chain };
}) {
  const _userId = decodeURIComponent(params.userId);
  const { address, profile } = await resolveSocialProfile(_userId as UserId);
  const user: User | null = await currentUser();
  const { getToken } = auth();
  const token = (await getToken({ template: "patchwallet" })) || "";
  if (!address) {
    notFound();
  }
  return (
    <main className="flex-1">
      {/* <AlphaBanner /> */}
      <div>
        <div className="mx-5 md:mx-10 relative h-full flex flex-col">
          <div className="flex justify-center mt-6 md:mt-[108px] mb-auto ">
            <div className="w-full md:w-[600px]">
              <div className="flex basis-0 flex-wrap gap-4 md:flex-nowrap">
                <ProfileWidget
                  address={address}
                  profile={profile}
                  chain={params.chain}
                  className="w-full"
                />
              </div>
              {/* <div className="mt-4">{user.userId && <ClaimNFT />}</div> */}
              {/* <div className="mt-4">{user.userId && <LinearQuest />}</div> */}
              <div className="mt-4">{/* <Inventory user={user} /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
