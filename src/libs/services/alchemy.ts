"server-only";
import { Address, Chain } from "@patchwallet/patch-sdk";
import {
  getChainNameFromShortName,
  getNetworkfromShortName,
} from "@patchwallet/patch-sdk/utils";
// import { Alchemy, Network, TokenBalancesResponseErc20 } from "alchemy-sdk";
// import { formatAlchemyToCovalentNFT } from "../utils";

// Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
// const settings = {
//   apiKey: process.env.ALCHEMY_API_KEY!, // Replace with your Alchemy API key.
//   network: Network.ETH_MAINNET, // Replace with your network.
// };

// class AlchemyService {
  //   private alchemy = new Alchemy(settings);

  export const fetchNFTBalance2 = async (address: Address, chain: Chain) => {
    // "use server"
    const network = getNetworkfromShortName(chain);
    if (network) {
      const ownedAssetsURL = `https://${network}.g.alchemy.com/nft/v3/${process.env.ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true&excludeFilters\[\]=SPAM`;
      const res = await fetch(ownedAssetsURL, {
        // cache: "no-cache",
        // next: { tags: ["alchemy_nft_collection"] },
      });
      const jsonRes = await res.json();
      const data = jsonRes.ownedNfts;
      //   console.log("data", data);
      return data;
      return formatAlchemyToCovalentNFT(data);

      //   console.log("image details", data[0].image)
      //   console.log("collection details", data[0].collection)
      //   console.log("raw details", data[0].raw)
      //   console.log("contract details", data[0].contract)
      // const alchemy = new Alchemy(settings);
      // const balances = await alchemy.core.getTokenBalances(address);
      // console.log("balances", balances);
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
  }
// }

// export const alchemyService = new AlchemyService();
