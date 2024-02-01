'use client'

import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserLookupForm } from './UserLookupForm';
import { useFormStatus } from 'react-dom';
import { Spinner } from './ui-old';

export function SendDialogContent() {
    const { pending } = useFormStatus();
  return (
    <Tabs defaultValue="account" className="inline-block">
      <div className="mb-1 flex text-base uppercase leading-4 text-gray-400">choose recipient</div>
      <TabsList className="grid w-full grid-cols-3 bg-gray-1000 gap-1">
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
      <TabsContent value="patch-user">
        <UserLookupForm type="server" withSubmitButton={true} />
        {pending && <div>Loading...</div>}
        {/* <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card> */}
      </TabsContent>
      <TabsContent value="password">
        {/* <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, you'll be logged out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card> */}
      </TabsContent>
    </Tabs>
  );
}
