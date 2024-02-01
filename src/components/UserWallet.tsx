import { SocialProfile } from "@/types";
import ProfileWidget from "./ProfileWidget";
import { Address, Chain } from "@patchwallet/patch-sdk";

export function UserWallet({
  address,
  profile,
  chain
}: {
    address: Address;
  profile: SocialProfile;
  chain: Chain
}) {
  return (
    <div className="w-full md:w-[600px]">
      <div className="flex basis-0 flex-wrap gap-4 md:flex-nowrap">
        <ProfileWidget address={address} profile={profile} chain={chain} />
      </div>
      {/* <div className="mt-4">{user.userId && <ClaimNFT />}</div> */}
      {/* <div className="mt-4">{user.userId && <LinearQuest />}</div> */}
      <div className="mt-4">
        {/* <Inventory user={user} /> */}
      </div>
    </div>
  );
}

