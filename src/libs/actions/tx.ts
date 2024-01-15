"use server";

import { client } from "../client";
import type { UserId, Chain, Address, HexString } from "@patchwallet/patch-sdk";

export async function sendTx(
  chain: Chain,
  userId: UserId,
  to: Address[],
  value: String[],
  data: HexString[],
  auth: string
) {
  const tx = await client.tx({
    userId,
    chain,
    to,
    value,
    data,
    delegatecall: 0,
    auth,
  });
  return tx;
}
