"use server";
import type { UserId, Chain, Address, HexString } from "@patchwallet/patch-sdk";
import { auth } from "@clerk/nextjs";
import { client } from "../client";

export async function sendTx(
  chain: Chain,
  userId: UserId,
  to: Address[],
  value: string[],
  data: HexString[],
) {
  const { getToken } = auth();
  const _token = await getToken({
    template: "patchwallet",
  });

  if (!_token) {
    throw new Error("Not authenticated");
  }

  const tx = await client.tx({
    userId,
    chain,
    to,
    value,
    data,
    delegatecall: 0,
    auth: _token,
  });

  if ("txHash" in tx) {
    return {
      txHash: tx.txHash,
    };
  }

  if ("error" in tx) {
    return {
      error: tx.error,
    };
  }
}
