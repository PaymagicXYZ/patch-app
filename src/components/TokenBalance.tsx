import { fetchTokenBalance } from "@/libs/fetchTokenBalance";
import { Chain, UserId } from "@patchwallet/patch-sdk";

export const TokenBalance = async ({
  wallet,
  chain,
}: {
  wallet: UserId;
  chain: Chain;
}) => {
  if (!wallet) return <div>Wallet not found</div>;
  const balance = await fetchTokenBalance(wallet, chain);
  return <pre>{JSON.stringify({ wallet, chain, balance })}</pre>;
};
