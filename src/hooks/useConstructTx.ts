import { InputToken, MetaTransaction } from "@/types";
import { NATIVE_TOKEN_ADDRESSES } from "@/utils/chain";
import { Address, HexString } from "@patchwallet/patch-sdk";
import { encodeFunctionData, erc20Abi, parseEther, parseUnits } from "viem";

export const useConstructTx = () => {
  const bundleTxns = async (
    tokens: InputToken[],
    to: Address,
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

    return [...tokenTxns];
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
