import "server-only";
import { getChainNameFromChainTag } from "@/utils/chain";
import { client } from "./client";
import type { UserId, Chain } from "@patchwallet/patch-sdk";

export async function fetchTokenBalance(userId: UserId, chain: Chain) {
  const address = await client.resolve(userId);
  const chainName = getChainNameFromChainTag(chain);
  if (chainName) {
    const url = `https://api.covalenthq.com/v1/${chainName}/address/${address}/balances_v2/`;
    const res = await fetch(url, {
      headers: {
        "Accept-Encoding": "*",
        "Content-Type": "application/json",
        Authorization: "Basic " + process.env.COVALENT_API_KEY,
      },
    }).then((res) => res.json());
    return res.data.items;
  } else {
    return null;
  }
}
