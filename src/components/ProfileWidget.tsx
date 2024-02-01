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
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';
import { GenericDialog } from './GenericDialog';
import { SignInButton, currentUser } from '@clerk/nextjs';
import isAuthed from '@/utils/isAuthed';
import { SendDialogContent } from './SendDialogContent';

async function ProfileWidget({ address, profile, chain }: { address: Address; profile: SocialProfile; chain: Chain }) {
  console.log({ address, profile });
  const whatToVerify = profile?.network === 'tel' ? 'phone number' : profile?.network === 'email' ? 'email' : 'social account';
  const _user = await currentUser();
  const auth = _user && isAuthed(profile.patchUserId, _user);
  console.log('USER IS AUTHED', auth);
  return (
    <WidgetContainer>
      <div className="flex justify-between">
        {address && <ProfileInfo profile={profile} checkMark />}
        <ViewAddressBtn disabled={!address} url={`https://polygonscan.com/address/${address}`} text="Block Explorer" />
      </div>

      <div className="mt-8 flex w-full flex-col items-center justify-center">
        <p className="text-sm leading-7 text-gray-700">TOTAL BALANCE</p>
        <Suspense fallback={<Skeleton className="my-1 h-10 w-28" />}>
          <TotalBalanceUSD address={address} chain={chain} />
        </Suspense>
        <AddressTooltip address={address} />
      </div>
      <div className="flex justify-end">
        <GenericDialog title="Send" subtitle={`In order to send you need to first verify your ${whatToVerify}`} className=''>
          {auth ? (
            <SendDialogContent />
          ) : (
            <div className="mt-4 flex w-full items-center justify-between rounded-xl border-[0.5px] border-gray-800 bg-gray-950 p-2">
              <ProfileInfo profile={profile} checkMark />
              <SignInButton redirectUrl={`/${profile.patchUserId}/${chain}`} />
            </div>
          )}
        </GenericDialog>
      </div>
      {/* <AccountActionButtons address={address} profile={profile} /> */}
    </WidgetContainer>
  );
}

export default ProfileWidget;
