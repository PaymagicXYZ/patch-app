import { SignInButton } from "@clerk/nextjs";
import ProfileInfo from "./ProfileInfo";
import { SocialProfile } from "@/types";
import { Chain } from "@patchwallet/patch-sdk";
import { Button } from "@/components/ui/button";
import { cn } from "@/libs/utils";

export const DialogNonAuth = ({
  profile,
  chain,
}: {
  profile: SocialProfile;
  chain: Chain;
}) => {
  const isTwitter = profile.network === "twitter";
  const isGithub = profile.network === "github";
  return (
    <div className="mt-4 flex w-full items-center justify-between rounded-xl border-[0.5px] border-gray-800 bg-gray-950 p-2">
      <ProfileInfo profile={profile} checkMark />
      <SignInButton
        redirectUrl={`/${profile.patchUserId}/${chain}`}
        mode="modal"
      >
        <Button
          className={cn(
            "rounded-xl bg-orange-900 text-orange-100 hover:bg-orange-900/80",
            {
              "bg-twitter-100 text-gray-1000 hover:bg-twitter-100/80":
                isTwitter,
              "bg-github-100 text-gray-1000 hover:bg-github-100/80": isGithub,
            },
          )}
        >
          Connect as {isTwitter ? `@${profile.handle}` : profile.handle}
        </Button>
      </SignInButton>
    </div>
  );
};
