"use server";

import { client } from "../client";
import type { UserId } from "@patchwallet/patch-sdk";

export const maxDuration = 300;
export async function signMsg(userId: UserId, message: string, auth: string) {
  const sig = await client.sign({
    userId,
    string: message,
    auth,
  });
  console.log(sig);
  return sig;
}
