'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserLookupCustom, UserLookupServerForm } from './UserLookupForm';

export function SendDialogContent() {
  return (
    <Tabs defaultValue="account" className="inline-block">
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
        <UserLookupServerForm />
      </TabsContent>
      <TabsContent value="address">
        <UserLookupCustom by="address" />
      </TabsContent>
      <TabsContent value="domain">
        <UserLookupCustom by="domain" />
      </TabsContent>
    </Tabs>
  );
}
