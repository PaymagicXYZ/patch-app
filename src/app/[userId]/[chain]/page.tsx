import { UserWallet } from '@/components/UserWallet';
import { Chain, UserId } from '@patchwallet/patch-sdk';
import { resolveSocialProfile } from '@/libs/actions/resolveSocialProfile';

export default async function Wallet({ params }: { params: { userId: UserId; chain: Chain } }) {
  const _userId = decodeURIComponent(params.userId);
  const { address, profile } = await resolveSocialProfile(_userId as UserId);

  return (
    <main className="flex-1">
      {/* <AlphaBanner /> */}
      <div>
        <div className="mx-5 md:mx-10 relative h-full flex flex-col">
          <div className="flex justify-center mt-6 md:mt-[108px] mb-auto ">
            <UserWallet address={address} profile={profile} chain={params.chain} />
          </div>
        </div>
      </div>
    </main>
  );
}
