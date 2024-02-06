"use server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserLookupServerForm } from "./UserLookupForm";
import { SocialProfile } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import isAuthed from "@/utils/isAuthed";
import { Address, Chain, UserId } from "@patchwallet/patch-sdk";
import ProfileInfo from "./ProfileInfo";
import { SignInButton } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { TokenInputForm } from "./ChooseTokensSection";
import { covalentService } from "@/libs/services/covalent";
import { formatUnits } from "viem";
import { BalanceItem } from "@covalenthq/client-sdk";

export async function SendDialogContent({
  profile,
  chain,
  address,
}: {
  profile: SocialProfile;
  chain: Chain;
  address: Address;
}) {
  const _user = await currentUser();
  const authed = _user && isAuthed(profile.patchUserId, _user);

  const tokenBalance =
    (await covalentService.fetchTokenBalance(address, chain)) ?? [];

  console.log({ tokenBalance });

  return authed ? (
    <div className="flex flex-col">
      <ChooseRecipientSection />
      <Separator className="my-4" />
      <ChooseTokensSection userId={profile.patchUserId} tokens={tokenBalance} />
    </div>
  ) : (
    <div className="mt-4 flex w-full items-center justify-between rounded-xl border-[0.5px] border-gray-800 bg-gray-950 p-2">
      <ProfileInfo profile={profile} checkMark />
      <SignInButton redirectUrl={`/${profile.patchUserId}/${chain}`} />
    </div>
  );
}

function ChooseRecipientSection() {
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

function ChooseTokensSection({
  userId,
  tokens,
}: {
  userId: UserId;
  tokens: BalanceItem[];
}) {
  return (
    <Tabs defaultValue="tokens" className="inline-block">
      <div className="mb-1 flex text-sm uppercase leading-4 text-gray-400">
        choose tokens
      </div>
      <TabsList className="grid w-full grid-cols-2 gap-1 bg-gray-1000">
        <TabsTrigger value="tokens" className="">
          Tokens
        </TabsTrigger>
        <TabsTrigger value="nfts" className="">
          NFTs
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tokens" defaultChecked>
        <TokenInputForm
          userId={userId}
          tokens={tokens?.map((token) => {
            console.log("TOKEN FROM RESPO", token);
            return {
              tickerSymbol: token.contract_ticker_symbol,
              amount: token.balance
                ? formatUnits(token.balance, token.contract_decimals)
                : "0",
              logoUrl: token.logo_url,
              price: token.quote_rate.toFixed(2),
              contractAddress: token.contract_address,
              decimals: token.contract_decimals,
            };
          })}
        />
      </TabsContent>
      <TabsContent value="nfts">
        {/* <UserLookupServerForm by="address" /> */}
      </TabsContent>
    </Tabs>
  );
}
