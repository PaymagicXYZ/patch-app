"server-only";
import { Address } from "@patchwallet/patch-sdk";
import { createPublicClient, http } from "viem";
import { normalize } from "viem/ens";
import { mainnet } from "viem/chains";

class UtilsService {
  private publicClient = createPublicClient({
    chain: mainnet,
    transport: http(),
  });

  async resolveDomain(domain: string): Promise<Address | null | undefined> {
    const resp = await fetch(
      `https://api.unstoppabledomains.com/resolve/domains/${domain}`,
      {
        method: "GET",
        headers: {
          Authorization:
            "Bearer hexzaf7xq-hjrniwyswac5rbt3d8uhlkebuul4gektqpgj8f",
        },
      },
    );
    const data = await resp.json();

    if (data.errors || !data.records) {
      try {
        const ensAddress = await this.publicClient.getEnsAddress({
          name: normalize(domain),
        });
        return ensAddress;
      } catch (error) {
        return null;
      }
    }
    if (data.records.addr) return data.records.addr;
    if (data.records["crypto.MATIC.version.MATIC.address"])
      return data.records["crypto.MATIC.version.MATIC.address"];
    if (data.records["crypto.ETH.address"])
      return data.records["crypto.ETH.address"];
  }
}

export const utilsService = new UtilsService();
