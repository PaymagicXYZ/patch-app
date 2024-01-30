import { SocialNetwork, UserId } from "@patchwallet/patch-sdk";

export default function isUserId(value: any): value is UserId {
  const parts = String(value).split(":");
  const [prefix, ...rest] = parts;
  const validPrefixes: SocialNetwork[] = [
    "email",
    "tel",
    "twitter",
    "github",
    "passphrase",
    "discord",
  ];
  return (
    validPrefixes.includes(prefix as SocialNetwork) && rest.join(":").length > 0
  );
}

export const parseUserId = (userId: UserId): { network: string; handle: string } => {
  if (!isUserId(userId)) {
    return { network: "", handle: "" };
  }

  const [network, handle] = userId.split(":");
  return { network, handle };  
};
