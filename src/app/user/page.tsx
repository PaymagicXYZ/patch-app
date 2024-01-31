import WalletDetail from '@/components/WalletDetail';
import { Suspense } from 'react';
export default async function Page() {
  return (
    <main className="m-4">
      <h1 className="text-xl">Patch wallets associated with this account:</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <WalletDetail />
      </Suspense>
    </main>
  );
}
