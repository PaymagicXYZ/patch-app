"use server";

import { isUserId } from "@patchwallet/patch-sdk/utils";
import { client } from "../client";
import type { Address, UserId } from "@patchwallet/patch-sdk";
import { supportedSocialNetworks } from "../services/social-network-resolver";

// TODO: Handle null case everywhere that this function is called instead of casting the response to 'Address'
export async function resolve(userId: UserId): Promise<Address | null> {
  if (!isUserId(userId)) {
    return null;
  }
  let _userId: UserId | null = userId;
  const [provider, userName] = userId.split(":");

  // Note: Check to see if the farcaster username still hasn't been resolved (to fid)
  if (provider === "farcaster" && isNaN(Number(userName))) {
    const profile =
      await supportedSocialNetworks[provider].resolveByUsername(userName);
    if ("error" in profile) {
      _userId = null;
    } else {
      _userId = profile.patchUserId;
    }
  }

  if (!_userId) {
    return null;
  }

  const address = (await client.resolve(_userId)) as Address;

  if (!address) {
    return null;
  }

  return address;
}
