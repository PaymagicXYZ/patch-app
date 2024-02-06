"use server";
import type { UserId, Chain, Address, HexString } from "@patchwallet/patch-sdk";
import { auth } from "@clerk/nextjs";
import { client } from "../client";

export async function sendTx(
  chain: Chain,
  userId: UserId,
  to: Address[],
  value: String[],
  data: HexString[],
) {
  const { getToken, session } = auth();
  const _token = await getToken({
    template: "patchwallet",
  });

  console.log({ chain, userId, to, value, data, _token });

  if (!_token) {
    throw new Error("Not authenticated");
  }

  try {
    const tx = await client.tx({
      userId,
      chain,
      to,
      value,
      data,
      delegatecall: 0,
      auth: _token,
    });
    return tx;
  } catch (e) {
    console.log("ERROR", e);
  }
}
