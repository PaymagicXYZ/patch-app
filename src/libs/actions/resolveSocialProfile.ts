'use server';
import isUserId from '@/utils/checkUserId';
import { SocialNetwork, supportedSocialNetworks } from '../services/social-network-resolver';
import { Address, UserId } from '@patchwallet/patch-sdk';
import { client } from '../client';
import z from 'zod';

export async function resolveSocialProfile(userId: UserId) {
  if (!isUserId(userId)) {
    throw new Error('Invalid userId');
  }
  const network = userId.split(':')[0] as SocialNetwork;
  const userName = userId.split(':')[1];

  const profile = await supportedSocialNetworks[network].resolveUser(userName);
  const address = (await client.resolve(userId)) as Address;
  console.log('RESOLVED profile', profile);
  return {
    profile,
    address,
  };
}

export async function fetchUserAddress(prevState: any, formData: FormData) {
  const schema = z.object({
    userId: z.string(),
    provider: z.string(),
  });
  const data = schema.parse({
    userId: formData.get('userId'),
    provider: formData.get('provider'),
  });

  const _userId = `${data.provider}:${data.userId}`;
  if (isUserId(_userId)) {
    console.log(1);
    const address = (await client.resolve(_userId as UserId)) as Address;
    console.log('ADDRESS', address);

    if (address) {
      return { address };
    }
  }
  return {
    address: '',
  };
}
