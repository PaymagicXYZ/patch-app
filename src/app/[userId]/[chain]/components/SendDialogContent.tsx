"use server";
import { currentUser } from "@clerk/nextjs/server";
import isAuthed from "@/libs/utils/isAuthed";
import { Chain, UserId } from "@patchwallet/patch-sdk";
import { Separator } from "../../../../components/ui/separator";
import { ChooseTokensSection } from "./ChooseTokensSection";
import { covalentService } from "@/libs/services/covalent";
import { formatUnits } from "viem";
import { sortCovalentAssetsByType } from "@/libs/utils";
import { resolveSocialProfile } from "@/libs/actions/utils";
import { ChooseRecipientSection } from "./ChooseRecipientSection";
import { DialogNonAuth } from "./DialogNonAuth";

export async function SendDialogContent({
  chain,
  userId,
}: {
  chain: Chain;
  userId: UserId;
}) {
  const _user = await currentUser();
  const authed = _user && isAuthed(userId, _user);
  const { address, profile } = await resolveSocialProfile(userId);

  const { data } =
    (await covalentService.fetchTokenBalance(address, chain, true)) ?? [];

  const sortedAssets = sortCovalentAssetsByType(data || []);

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
            tokenId: nft.nft_data[0]?.token_id?.toString() ?? "0",
            amount: nft.balance?.toString() ?? "1",
            logoUrl: nft.logo_url,
            decimals: nft.contract_decimals,
            supportedERCStandards: nft.supports_erc as unknown as string[],
          };
        })}
      />
    </div>
  ) : (
    <DialogNonAuth chain={chain} profile={profile} />
  );
}
