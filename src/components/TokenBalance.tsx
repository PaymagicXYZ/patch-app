import { fetchTokenBalance } from '@/libs/fetchTokenBalance';
import { covalentService } from '@/libs/services/covalent';
import { Chain, UserId } from '@patchwallet/patch-sdk';

export const TokenBalance = async ({ wallet, chain }: { wallet: UserId; chain: Chain }) => {
  if (!wallet) return <div>Wallet not found</div>;
  // const balance = await fetchTokenBalance(wallet, chain);
  const balance = await covalentService.fetchTokenBalance(wallet, chain);
  // console.log("balance", balance)
  return <pre>{balance?.map(token => {
    return <div key={token.contract_address}>{token.contract_ticker_symbol}</div>
  })}</pre>;
};
