"server-only";
"use server";
import { Address, Chain } from "@patchwallet/patch-sdk";
import { getChainNameFromShortName } from "@patchwallet/patch-sdk/utils";
import { covalentInstance } from "../client";
import { sortCovalentAssetsByType } from "../utils";
import { revalidateTag, unstable_cache } from "next/cache";

export const fetchTokenBalance = unstable_cache(
	async (
		address: Address,
		chain: Chain,
		withNFTs = false,
		includeFiatValue = false,
	) => {
		const chainName = getChainNameFromShortName(chain);

		if (chainName) {
			const response =
				await covalentInstance.BalanceService.getTokenBalancesForWalletAddress(
					chainName,
					address as Address,
					{
						nft: withNFTs,
					},
				);

			const sortedAssets = sortCovalentAssetsByType(
				response?.data?.items || [],
				includeFiatValue,
			);

			return {
				data: sortedAssets,
				error: response.error_message,
				fiatBalance: sortedAssets.fiatValue,
			};
		}

		return { data: { nfts: [], tokens: [] }, error: "Invalid Chain" };
	},
	["fetch_tokens"],
	{
		tags: ["token_balance"],
		revalidate: 300,
	},
);

export const fetchFiatBalance = unstable_cache(
	async (address: Address, chain: Chain) => {
		return fetchTokenBalance(address, chain, false, true);
	},
	["fetch_fiat"],
	{
		tags: ["fiat_balance"],
		revalidate: 300,
	},
);
