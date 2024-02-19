import { InputToken, MetaTransaction, NFTToken } from "@/types";
import { ERC1155Abi } from "@/libs/utils/abis";
import { NATIVE_TOKEN_ADDRESSES } from "@/libs/utils/constants";
import { Address, HexString } from "@patchwallet/patch-sdk";
import { encodeFunctionData, erc20Abi, parseEther, parseUnits, erc721Abi } from "viem";

export const useConstructTx = () => {
  const bundleTxns = async (
    tokens: InputToken[],
    nfts: NFTToken[],
    to: Address,
    from: Address,
  ): Promise<MetaTransaction[]> => {
    const tokenTxns = tokens.map((token) => {
      return NATIVE_TOKEN_ADDRESSES.includes(token.contractAddress)
        ? {
            to: to,
            value: String(parseEther(token.value)),
            data: "0x",
          }
        : {
            to: token.contractAddress,
            value: "0",
            data: encodeFunctionData({
              abi: erc20Abi,
              functionName: "transfer",
              args: [to, parseUnits(token.value, token.decimals)],
            }),
          };
    });

    const nftTxns = await Promise.all(
      nfts?.map((nft) => {
        if (nft.supportedERCStandards.includes('erc1155')) {
          return {
            to: nft.contractAddress,
            value: "0",
            data: encodeFunctionData({
              abi: ERC1155Abi,
              functionName: "safeTransferFrom",
              args: [
                from,
                to,
                nft.tokenId,
                "1",
                "0x",
              ],
            }),
          };
        } else {
          return {
            to: nft.contractAddress,
            value: "0",
            data: encodeFunctionData({
              abi: erc721Abi,
              functionName: "transferFrom",
              args: [from, to, BigInt(nft.tokenId)],
            }),
          };
        }
      })
    );

    return [...tokenTxns, ...nftTxns];
  };
  

  const formatTxData = (txData: MetaTransaction[]) => {
    return {
      to: txData.map((tx) => tx.to) as Address[],
      value: txData.map((tx) => tx.value),
      data: txData.map((tx) => tx.data) as HexString[],
    };
  };

  return { bundleTxns, formatTxData };
};
