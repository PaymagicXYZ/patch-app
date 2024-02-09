"use server";

import { client } from "../client";
import type { UserId } from "@patchwallet/patch-sdk";

export async function resolve(userId: UserId) {
  const resolved = await client.resolve(userId);
  return resolved;
}
