import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserLookupServerForm } from "./UserLookupForm";

export function ChooseRecipientSection() {
  return (
    <Tabs defaultValue="patch-user" className="inline-block">
      <div className="mb-1 flex text-sm uppercase leading-4 text-gray-400">
        choose recipient
      </div>
      <TabsList className="grid w-full grid-cols-3 gap-1 bg-gray-1000">
        <TabsTrigger value="patch-user" className="">
          Patch User
        </TabsTrigger>
        <TabsTrigger value="address" className="">
          Address
        </TabsTrigger>
        <TabsTrigger value="domain" className="">
          Domain
        </TabsTrigger>
      </TabsList>
      <TabsContent value="patch-user" defaultChecked>
        <UserLookupServerForm by={"default"} />
      </TabsContent>
      <TabsContent value="address">
        <UserLookupServerForm by="address" />
      </TabsContent>
      <TabsContent value="domain">
        <UserLookupServerForm by="domain" />
      </TabsContent>
    </Tabs>
  );
}
