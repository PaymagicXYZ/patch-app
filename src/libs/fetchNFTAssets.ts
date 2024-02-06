import {
  getChainNameFromShortName,
  getNetworkfromShortName,
} from "@/utils/chain";
import { UserId, Chain } from "@patchwallet/patch-sdk";
import { client } from "./client";

export const fetchNFTAssets = async (userId: UserId, chain: Chain) => {
  const address = await client.resolve(userId);
  const network = getNetworkfromShortName(chain);
  if (network) {
    const ownedAssetsURL = `https://${network}.g.alchemy.com/nft/v3/${process.env.ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true&excludeFilters\[\]=SPAM`;
    return fetch(ownedAssetsURL)
      .then((res) => res.json())
      .then(async (data) => {
        return data.ownedNfts;
      });
  } else {
    const chainName = getChainNameFromShortName(chain);
    const nftURL = `https://api.covalenthq.com/v1/${chainName}/address/${address}/balances_nft/`;
    const data = await fetch(nftURL, {
      headers: {
        "Accept-Encoding": "*",
        "Content-Type": "application/json",
        Authorization: "Basic " + process.env.COVALENT_API_KEY,
      },
    }).then((res) => res.json());
    return data;
  }
};
