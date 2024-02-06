"use server";

import { client } from "../client";
import type { UserId } from "@patchwallet/patch-sdk";

export async function signMsg(userId: UserId, message: string, auth: string) {
  console.log(userId, message, auth);
  const sig = await client.sign({
    userId,
    string: message,
    auth,
  });
  console.log(sig);
  return sig;
}
