import { ReactNode } from 'react';
import { Address, SocialNetwork } from '@patchwallet/patch-sdk';

export const TWITTER = 'twitter';
export const GITHUB = 'github';
export const EMAIL = 'email';
export const TEL = 'tel';

export const socialNetworks = [TWITTER, GITHUB, EMAIL, TEL] as const;

export type UserId = `${SocialNetwork}:${string}`;

export type User = {
  accountAddress: Address;
  userId: UserId;
};

export type SupportedSocialNetworkIds = Exclude<SocialNetwork, 'discord'>;

export type SupportedSocialNetworksDetails = Record<SupportedSocialNetworkIds, SupportedSocialNetworkDetails>;
export type SupportedSocialNetworkDetails = {
  id: SupportedSocialNetworkIds;
  name: 'Twitter' | 'Github' | 'Email' | 'Phone' | 'Passphrase' | 'Farcaster';
  iconSrc: string;
  iconAlt: string;
  label: 'Twitter' | 'Github' | 'Email' | 'Phone' | 'Passphrase' | 'Farcaster' | '';
  placeholder: string;
};
