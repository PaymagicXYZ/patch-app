import { Suspense } from 'react';
import ViewAddressBtn from './components-old/ViewAddressBtn';
import ProfileInfo from './components-old/ProfileInfo';
import WidgetContainer from './components-old/WidgetContainer';
import AccountActionButtons from './components-old/ActionsWidget';
import { SocialProfile } from '@/types';
import { Skeleton } from './ui/skeleton';
import { Address, Chain } from '@patchwallet/patch-sdk';
import { AddressTooltip } from './AddressTooltip';
import { TotalBalanceUSD } from './TotalBalance';

function ProfileWidget({ address, profile, chain }: { address: Address; profile: SocialProfile; chain: Chain }) {
  console.log({ address, profile });

  return (
    <WidgetContainer>
      <div className="flex justify-between">
        {address && <ProfileInfo profile={profile} checkMark />}
        <ViewAddressBtn disabled={!address} url={`https://polygonscan.com/address/${address}`} text="Block Explorer" />
      </div>

      <div className="mt-8 flex w-full flex-col items-center justify-center">
        <p className="text-sm leading-7 text-gray-700">TOTAL BALANCE</p>
        <Suspense fallback={<Skeleton className='my-1 h-10 w-28'/>}>
          <TotalBalanceUSD address={address} chain={chain} />
        </Suspense>
        <AddressTooltip address={address} />
      </div>
      {/* <AccountActionButtons /> */}
    </WidgetContainer>
  );
}

export default ProfileWidget;
