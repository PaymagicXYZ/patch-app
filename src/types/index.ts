import { ReactNode } from "react";
import {
  Address,
  HexString,
  SocialNetwork,
  UserId,
} from "@patchwallet/patch-sdk";

export const TWITTER = "twitter";
export const GITHUB = "github";
export const EMAIL = "email";
export const TEL = "tel";

export const socialNetworks = [TWITTER, GITHUB, EMAIL, TEL] as const;

// export type UserId = `${SocialNetwork}:${string}`;

export type User = {
  accountAddress: Address;
  userId: UserId;
};

export type SupportedSocialNetworkIds = Exclude<SocialNetwork, "discord" | "farcaster">;

export type SupportedSocialNetworksDetails = Record<
  SupportedSocialNetworkIds,
  SupportedSocialNetworkDetails
>;
export type SupportedSocialNetworkDetails = {
  id: SupportedSocialNetworkIds;
  name: "Twitter" | "Github" | "Email" | "Phone" | "Passphrase" | "Farcaster";
  iconSrc: string;
  iconAlt: string;
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

export type ResolvedUser = {
  assignedWallet: boolean;
  accountAddress: Address;
  message: string;
  userId: UserId;
};

export type SocialProfile = {
  name: string;
  description: string;
  image: string;
  network: SocialNetwork;
  handle: string;
  patchUserId: UserId;
};

export type UserLookupBy = "address" | "domain" | "default";

export interface Token {
  tickerSymbol: string;
  amount: string;
  logoUrl: string;
  price: string;
  contractAddress: string;
  decimals: number;
}

export interface NFTToken extends Token {
  tokenId: string;
  tokenUrl?: string;
  supportedERCStandards: string[];
}

export interface InputToken extends Token {
  value: string;
}

export interface MetaTransaction {
  readonly to: string;
  readonly value: string;
  readonly data: string;
}
