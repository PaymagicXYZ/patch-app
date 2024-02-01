import { covalentService } from '@/libs/services/covalent';
import { Address, Chain } from '@patchwallet/patch-sdk';

export async function TotalBalanceUSD({ address, chain }: { address: Address; chain: Chain }) {
  const fiatBalance = await covalentService.fetchFiatBalance(address, chain);
  return <h2 className="mb-4 mt-1 flex items-center text-4xl">{`$ ${fiatBalance?.toFixed(2)}`}</h2>;
}
