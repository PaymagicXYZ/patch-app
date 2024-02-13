"use client";
import { Button } from "./ui/button";

function ShareButton({
  type,
}: {
  type: "donate" | "drop" | "withdraw" | "claim";
}) {
  const redirectUrl = window.location.origin;
  const text =
    type === "donate"
      ? "I just gifted assets via @patchwallet!&#010; "
      : type === "drop"
      ? "I just airdropped funds using SocialDrop!&#010; "
      : type === "claim"
      ? "I just claimed my @patchwallet NFT!&#010; "
      : "I just sent funds from my @patchwallet!%0ACheck out yours at ";
  const twitterUrl = `http://twitter.com/intent/tweet?text=${text.replace(
    /\s/g,
    "%20",
  )}&url=${redirectUrl}`;
  return (
    <Button
      onClick={() => window.open(twitterUrl, "_blank")}
      className="transform-gpu animate-twitter-pulse border-none bg-twitter-100 shadow-[0_0_0_0_#18181b,_0_0_0_0_#57abffb3]"
    >
      Share on Twitter
    </Button>
  );
}

export default ShareButton;
