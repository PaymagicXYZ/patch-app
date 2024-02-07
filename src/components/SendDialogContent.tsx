"use server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserLookupServerForm } from "./UserLookupForm";
import { SocialProfile } from "@/types";
import { currentUser } from "@clerk/nextjs/server";
import isAuthed from "@/utils/isAuthed";
import { Address, Chain } from "@patchwallet/patch-sdk";
import ProfileInfo from "./ProfileInfo";
import { SignInButton } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { ChooseTokensSection } from "./ChooseTokensSection";
import { covalentService } from "@/libs/services/covalent";
import { formatUnits } from "viem";
import { sortCovalentAssetsByType } from "@/utils";

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
    (await covalentService.fetchTokenBalance(address, chain, true)) ?? [];

  const sortedAssets = sortCovalentAssetsByType(tokenBalance);

  return authed ? (
    <div className="flex flex-col">
      <ChooseRecipientSection />
      <Separator className="my-4" />
      <ChooseTokensSection
        profile={profile}
        tokens={sortedAssets.tokens?.map((token) => {
          return {
            tickerSymbol: token.contract_ticker_symbol,
            amount: token.balance
              ? formatUnits(token.balance, token.contract_decimals)
              : "0",
            logoUrl: token.logo_url,
            price: token.quote_rate?.toFixed(2),
            contractAddress: token.contract_address,
            decimals: token.contract_decimals,
          };
        })}
        nfts={sortedAssets.nfts?.map((nft) => {
          return {
            tickerSymbol: nft.contract_display_name,
            contractAddress: nft.contract_address,
            price: nft.quote_rate?.toFixed(2) ?? 0,
            tokenUrl: nft.nft_data[0]?.external_data?.image,
            tokenId: nft.nft_data[0]?.token_id?.toString(),
            amount: nft.balance?.toString() ?? "1",
            logoUrl: nft.logo_url,
            decimals: nft.contract_decimals,
          };
        })}
      />
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
