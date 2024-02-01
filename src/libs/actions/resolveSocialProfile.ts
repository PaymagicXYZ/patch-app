'use server';
import isUserId from '@/utils/checkUserId';
import { SocialNetwork, supportedSocialNetworks } from '../services/social-network-resolver';
import { Address, UserId } from '@patchwallet/patch-sdk';
import { client } from '../client';

export async function resolveSocialProfile(userId: UserId): Promise<{ profile: any; address: Address }>{
  if (!isUserId(userId)) {
    throw new Error('Invalid userId');
  }
  const network = userId.split(':')[0] as SocialNetwork;
  const userName = userId.split(':')[1];

  const profile = await supportedSocialNetworks[network].resolveUser(userName);
  const address = await client.resolve(userId) as Address;
  console.log('RESOLVED profile', profile);
  return {
    profile,
    address,
  };
}
