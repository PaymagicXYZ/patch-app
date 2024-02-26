import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NFTToken, SupportedSocialNetworksDetails, Token } from "@/types";
import { BalanceItem } from "@covalenthq/client-sdk";
import { formatUnits } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSupportedLookupNetworks(
  isMobile = false,
): SupportedSocialNetworksDetails {
  return {
    twitter: {
      id: "twitter",
      name: "Twitter",
      label: isMobile ? "" : "Twitter",
      placeholder: !isMobile ? "Search for Twitter profile..." : "username",
      iconSrc: "/twitter.svg",
      iconAlt: "twitter icon",
    },
    github: {
      id: "github",
      name: "Github",
      label: isMobile ? "" : "Github",
      placeholder: !isMobile ? "Search for Github profile..." : "username",
      iconSrc: "/github.svg",
      iconAlt: "github icon",
    },
    email: {
      id: "email",
      name: "Email",
      label: isMobile ? "" : "Email",
      placeholder: !isMobile ? "Search for Email address..." : "email",
      iconSrc: "/email.svg",
      iconAlt: "email icon",
    },
    tel: {
      id: "tel",
      name: "Phone",
      label: isMobile ? "" : "Phone",
      placeholder: !isMobile ? "Search for phone number..." : "phone number",
      iconSrc: "/tel.svg",
      iconAlt: "phone icon",
    },
    passphrase: {
      id: "passphrase",
      name: "Passphrase",
      label: isMobile ? "" : "Passphrase",
      placeholder: !isMobile ? "Search for passphrase wallet..." : "passphrase",
      iconSrc: "/passphrase.svg",
      iconAlt: "passphrase icon",
    },
    farcaster: {
      id: "farcaster",
      name: "Farcaster",
      label: isMobile ? "" : "Farcaster",
      placeholder: !isMobile ? "Search for farcaster wallet..." : "fid",
      iconSrc: "/farcaster.svg",
      iconAlt: "farcaster icon",
    },
  };
}

export const sortCovalentAssetsByType = (
  assets: BalanceItem[],
  includeFiatValue = false,
) => {
  return assets.reduce(
    (acc, curr) => {
      if (curr.type === "nft") {
        acc["nfts"].push({
          tickerSymbol: curr.contract_display_name,
          contractAddress: curr.contract_address,
          price: curr.quote_rate?.toFixed(2) ?? 0,
          tokenUrl: curr.nft_data[0]?.external_data?.image,
          tokenId: curr.nft_data[0]?.token_id?.toString() ?? "0",
          balance: curr.balance?.toString() ?? "1",
          logoUrl: curr.logo_url,
          decimals: curr.contract_decimals,
          supportedERCStandards: curr.supports_erc as unknown as string[],
        });
      }
      if (
        (curr.type === "cryptocurrency" || curr.type === "dust") &&
        curr.balance
      ) {
        acc["tokens"].push({
          tickerSymbol: curr.contract_ticker_symbol,
          balance: curr.balance
            ? formatUnits(curr.balance, curr.contract_decimals)
            : "0",
          logoUrl: curr.logo_url,
          price: curr.quote_rate?.toFixed(2),
          contractAddress: curr.contract_address,
          decimals: curr.contract_decimals,
        });
      }

      if (includeFiatValue) {
        acc["fiatValue"] += curr.quote;
      }

      return acc;
    },
    {
      nfts: [] as NFTToken[],
      tokens: [] as Token[],
      fiatValue: 0,
    },
  );
};

export function isNFT(token: Token | NFTToken): token is NFTToken {
  return (token as NFTToken).tokenId !== undefined;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
