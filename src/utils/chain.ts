import { Chain } from "@patchwallet/patch-sdk";
export interface ChainDetail {
  [chainId: number]: {
    AlchemyChainNetwork: string;
    CovalentChainName: string;
    chainTag: Chain;
  };
}

export const ChainIdForChainName: ChainDetail = {
  // 1: {
  //   AlchemyChainNetwork: "eth-mainnet",
  //   CovalentChainName: "eth-mainnet",
  //   chainTag: "eth",
  // },
  137: {
    AlchemyChainNetwork: "polygon-mainnet",
    CovalentChainName: "matic-mainnet",
    chainTag: "matic",
  },
  10: {
    AlchemyChainNetwork: "optimism-mainnet",
    CovalentChainName: "optimism-mainnet",
    chainTag: "oeth",
  },
  42161: {
    AlchemyChainNetwork: "arbitrum-mainnet",
    CovalentChainName: "arbitrum-mainnet",
    chainTag: "arb1",
  },
  59144: {
    AlchemyChainNetwork: "",
    CovalentChainName: "linea-mainnet",
    chainTag: "linea",
  },
  8453: {
    AlchemyChainNetwork: "",
    CovalentChainName: "base-mainnet",
    chainTag: "base",
  },
  // 100: {
  //   AlchemyChainNetwork: "",
  //   CovalentChainName: "gnosis-mainnet",
  //   chainTag: "xdai",
  // },
  // 56: {
  //   AlchemyChainNetwork: "bsc-mainnet",
  //   CovalentChainName: "bsc-mainnet",
  //   chainTag: "bsc",
  // },
  80001: {
    AlchemyChainNetwork: "matic-mumbai",
    CovalentChainName: "matic-mumbai",
    chainTag: "maticmum",
  },
};
export const supportedNetworks = Object.values(ChainIdForChainName).map(
  (chain) => chain.AlchemyChainNetwork
);
export const supportedChainNames = Object.values(ChainIdForChainName).map(
  (chain) => chain.CovalentChainName
);
export const supportedChainIds = Object.keys(ChainIdForChainName).map(
  (chainIdStr) => Number(chainIdStr)
);
export const supportedChainTags = Object.values(ChainIdForChainName).map(
  (chain) => chain.chainTag
);
export type Networks = (typeof supportedNetworks)[number];
export type ChainName = (typeof supportedChainNames)[number];
export type ChainId = (typeof supportedChainIds)[number];
export type ChainTag = (typeof supportedChainTags)[number];
export const getNetworkFromChainId = (chainId: ChainId): Networks =>
  ChainIdForChainName[chainId].AlchemyChainNetwork;

export const getChainNameFromChainId = (chainId: ChainId): ChainName =>
  ChainIdForChainName[chainId].CovalentChainName;

export const getChainIdFromNetwork = (network: Networks): ChainId => {
  const chainId = Object.keys(ChainIdForChainName).find(
    (key) => ChainIdForChainName[Number(key)].AlchemyChainNetwork === network
  );
  return Number(chainId);
};

export const getChainNameFromChainTag = (chainTag: ChainTag): ChainName => {
  const chainName = Object.keys(ChainIdForChainName).find(
    (key) => ChainIdForChainName[Number(key)].chainTag === chainTag
  );
  return ChainIdForChainName[Number(chainName)].CovalentChainName;
};

export const getNetworkfromChainTag = (chainTag: ChainTag): Networks => {
  const network = Object.keys(ChainIdForChainName).find(
    (key) => ChainIdForChainName[Number(key)].chainTag === chainTag
  );
  return ChainIdForChainName[Number(network)].AlchemyChainNetwork;
};

export const isSupportedChain = (chain: ChainTag): boolean =>
  supportedChainTags.includes(chain);
