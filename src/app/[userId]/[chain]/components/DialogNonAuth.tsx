import { SignInButton } from "@clerk/nextjs";
import ProfileInfo from "./ProfileInfo";
import { SocialProfile } from "@/types";
import { Chain } from "@patchwallet/patch-sdk";

export const DialogNonAuth = ({
  profile,
  chain,
}: {
  profile: SocialProfile;
  chain: Chain;
}) => {
  return (
    <div className="mt-4 flex w-full items-center justify-between rounded-xl border-[0.5px] border-gray-800 bg-gray-950 p-2">
      <ProfileInfo profile={profile} checkMark />
      <SignInButton
        redirectUrl={`/${profile.patchUserId}/${chain}`}
        mode="modal"
      />
    </div>
  );
};
