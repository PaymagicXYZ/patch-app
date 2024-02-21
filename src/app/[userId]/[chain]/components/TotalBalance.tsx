import { fetchFiatBalance, fetchTokenBalance } from "@/libs/actions/tokens";
import { Address, Chain } from "@patchwallet/patch-sdk";

export async function TotalBalanceUSD({
  address,
  chain,
}: {
  address: Address;
  chain: Chain;
}) {
  // Note: We are fetching the with nft=true because that spares us 1 additional call to covalent, as we are already fetching all nfts for the AssetsTabs
  const { fiatBalance } = await fetchFiatBalance(address, chain);
  return (
    <h2 className="mb-4 mt-1 flex items-center text-4xl">{`$ ${
      !!fiatBalance || isNaN(Number(fiatBalance))
        ? "0.00"
        : fiatBalance?.toFixed(2)
    }`}</h2>
  );
}
