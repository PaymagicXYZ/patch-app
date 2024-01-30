import { ReactNode } from "react";
import { SocialNetwork } from "@patchwallet/patch-sdk";

export const TWITTER = "twitter";
export const GITHUB = "github";
export const EMAIL = "email";
export const TEL = "tel";

export const socialNetworks = [TWITTER, GITHUB, EMAIL, TEL] as const;

export type UserId = `${SocialNetwork}:${string}`;

export type User = {
  accountAddress: Address;
  userId: UserId;
};


export type SocialNetworkListItem = {
  id: SocialNetwork
  name: "Twitter" | "Github" | "Email" | "Phone" | "Passphrase" | "Farcaster";
  icon: ReactNode;
  label:
    | "Twitter"
    | "Github"
    | "Email"
    | "Phone"
    | "Passphrase"
    | "Farcaster"
    | "";
  placeholder: string;
};
