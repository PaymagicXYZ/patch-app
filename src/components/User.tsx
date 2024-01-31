import { currentUser, auth } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';
import { client } from '@/libs/client';
import type { UserId } from '@patchwallet/patch-sdk';
import AccountSelector from '@/components/AccountSelector';
import ChainSelector from './ChainSelector';
export default async function UserDetail() {
  const user: User | null = await currentUser();

  if (user) {
    const availableWallets = [
      ...user.emailAddresses.map((email) => `email:${email.emailAddress}`),
      ...user.phoneNumbers.map((tel) => `tel:${tel.phoneNumber}`),
      ...user.externalAccounts
        .filter((account) => account.provider)
        .map((account) => `${account.provider.split('_')[1]}:${account.username || account.externalId}`),
    ] as UserId[];
    const wallets = (await client.resolve(availableWallets)) as string[];

    return (
      <>
        <AccountSelector availableWallets={availableWallets} wallets={wallets} />
        <ChainSelector />
      </>
    );
  }
}
