import { client } from "@/libs/client";
import { covalentService } from "@/libs/services/covalent";
import { Address, Chain, UserId } from "@patchwallet/patch-sdk";

export const TokenBalance = async ({
  wallet,
  chain,
}: {
  wallet: UserId;
  chain: Chain;
}) => {
  if (!wallet) return <div>Wallet not found</div>;
  const address = (await client.resolve(wallet)) as Address;

  const balance = await covalentService.fetchTokenBalance(address, chain);
  return (
    <pre>
      {balance?.map((token) => {
        return (
          <div key={token.contract_address}>{token.contract_ticker_symbol}</div>
        );
      })}
    </pre>
  );
};
