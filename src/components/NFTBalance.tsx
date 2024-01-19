import { fetchNFTAssets } from "@/libs/fetchNFTAssets";
import { Chain, UserId } from "@patchwallet/patch-sdk";

export const NFTBalance = async ({
  wallet,
  chain,
}: {
  wallet: UserId;
  chain: Chain;
}) => {
  if (!wallet) return <div>Wallet not found</div>;
  const balance = await fetchNFTAssets(wallet, chain);
  return <pre>{JSON.stringify({ balance })}</pre>;
};
