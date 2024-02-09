"server-only";
import { BalanceItem, CovalentClient } from "@covalenthq/client-sdk";
import { Address, Chain } from "@patchwallet/patch-sdk";
import { getChainNameFromShortName } from "@patchwallet/patch-sdk/utils";

class CovalentServiceV2 {
  private covalentInstance = new CovalentClient(process.env.COVALENT_API_KEY!);

  async fetchTokenBalance(address: Address, chain: Chain, withNFTs = false) {
    const chainName = getChainNameFromShortName(chain);

    if (chainName) {
      const response =
        await this.covalentInstance.BalanceService.getTokenBalancesForWalletAddress(
          chainName,
          address as Address,
          {
            nft: withNFTs,
          },
        );
      // console.log("data result", response);
      return response.data?.items;
    } else {
      return null;
    }
  }

  async fetchFiatBalance(address: Address, chain: Chain) {
    const chainName = getChainNameFromShortName(chain);

    if (chainName) {
      const response =
        await this.covalentInstance.BalanceService.getTokenBalancesForWalletAddress(
          chainName,
          address as Address,
        );

      if (response.error) {
        return null;
      }
      const tokens = response.data.items;
      const fiatBalance = tokens.reduce((acc: number, token: BalanceItem) => {
        return acc + token.quote;
      }, 0);
      return fiatBalance;
    } else {
      return null;
    }
  }
}

export const covalentService = new CovalentServiceV2();
