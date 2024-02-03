'use server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserLookupServerForm } from './UserLookupForm';
import { SocialProfile } from '@/types';
import { currentUser } from '@clerk/nextjs/server';
import isAuthed from '@/utils/isAuthed';
import { Chain } from '@patchwallet/patch-sdk';
import ProfileInfo from './ProfileInfo';
import { SignInButton } from '@clerk/nextjs';

export async function SendDialogContent({ profile, chain }: { profile: SocialProfile; chain: Chain }) {
  const _user = await currentUser();
  const authed = _user && isAuthed(profile.patchUserId, _user);

  return authed ? (
    <Tabs defaultValue="patch-user" className="inline-block">
      <div className="mb-1 flex text-base uppercase leading-4 text-gray-400">choose recipient</div>
      <TabsList className="grid w-full grid-cols-3 gap-1 bg-gray-1000">
        <TabsTrigger value="patch-user" className="">
          Patch User
        </TabsTrigger>
        <TabsTrigger value="address" className="">
          Address
        </TabsTrigger>
        <TabsTrigger value="domain" className="">
          <div>Domain</div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="patch-user" defaultChecked>
        <UserLookupServerForm by={'default'} />
      </TabsContent>
      <TabsContent value="address">
        <UserLookupServerForm by="address" />
      </TabsContent>
      <TabsContent value="domain">
        <UserLookupServerForm by="domain" />
      </TabsContent>
    </Tabs>
  ) : (
    <div className="mt-4 flex w-full items-center justify-between rounded-xl border-[0.5px] border-gray-800 bg-gray-950 p-2">
      <ProfileInfo profile={profile} checkMark />
      <SignInButton redirectUrl={`/${profile.patchUserId}/${chain}`} />
    </div>
  );
}
