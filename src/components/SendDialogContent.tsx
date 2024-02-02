'use client';

import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserInputByAddress, UserInputServerForm } from './UserLookupForm';
import { useFormStatus } from 'react-dom';

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
        <UserInputServerForm />
      </TabsContent>

      <TabsContent value="address">
        <UserInputByAddress />
      </TabsContent>
    </Tabs>
  );
}
