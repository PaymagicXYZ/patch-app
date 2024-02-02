import { Chain, UserId } from '@patchwallet/patch-sdk';
import { resolveSocialProfile } from '@/libs/actions/utils';
import ProfileWidget from '@/components/ProfileWidget';

export default async function Wallet({ params }: { params: { userId: UserId; chain: Chain } }) {
  const _userId = decodeURIComponent(params.userId);
  const { address, profile } = await resolveSocialProfile(_userId as UserId);

  return (
    <main className="flex-1">
      {/* <AlphaBanner /> */}
      <div>
        <div className="mx-5 md:mx-10 relative h-full flex flex-col">
          <div className="flex justify-center mt-6 md:mt-[108px] mb-auto ">
            <div className="w-full md:w-[600px]">
              <div className="flex basis-0 flex-wrap gap-4 md:flex-nowrap">
                <ProfileWidget address={address} profile={profile} chain={params.chain} className='w-full' />
              </div>
              {/* <div className="mt-4">{user.userId && <ClaimNFT />}</div> */}
              {/* <div className="mt-4">{user.userId && <LinearQuest />}</div> */}
              <div className="mt-4">{/* <Inventory user={user} /> */}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
