import WidgetContainer from "../../../../components/WidgetContainer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { NFTToken, Token } from "@/types";
import { Chain, UserId } from "@patchwallet/patch-sdk";
import { formatUnits } from "viem";
import Image from "next/image";
import { minifyAddress } from "@/libs/utils/checkUserId";
import { sortCovalentAssetsByType } from "@/libs/utils";
import { resolveSocialProfile } from "@/libs/actions/utils";
import { fetchTokenBalance } from "@/libs/actions/tokens";

export async function AssetsTab({
  chain,
  userId,
}: {
  chain: Chain;
  userId: UserId;
}) {
  const { address } = await resolveSocialProfile(userId);

  const { data, error } = (await fetchTokenBalance(address, chain, true)) ?? [];

  console.log("data", data);

  return (
    <WidgetContainer className="h-[416px]">
      <Tabs defaultValue="tokens" className="flex h-full flex-col">
        <TabsList className="grid w-full grid-cols-2 gap-1 bg-gray-1000">
          <TabTrigger
            count={data.tokens?.length}
            title="Tokens"
            value="tokens"
          />
          <TabTrigger count={data.nfts?.length} title="NFTs" value="nfts" />
        </TabsList>
        <TabsContent value="tokens" className="h-full flex-1">
          <div className="h-full rounded-xl border border-gray-800 bg-gray-1000">
            {!error ? (
              data?.tokens.map((token, i) => (
                <TokenRow key={token.tickerSymbol + i} {...token} />
              ))
            ) : (
              <ErrorFallback />
            )}
          </div>
        </TabsContent>
        <TabsContent value="nfts" className="h-full flex-1">
          <div className="h-full rounded-xl border border-gray-800 bg-gray-1000">
            {!error ? (
              data?.nfts.map((token) => (
                <NFTRow key={token.tokenId} {...token} />
              ))
            ) : (
              <ErrorFallback />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </WidgetContainer>
  );
}

const TokenRow = ({
  balance,
  logoUrl,
  price,
  tickerSymbol,
}: Omit<Token, "contractAddress" | "decimals">) => {
  return (
    <div
      key={tickerSymbol}
      className="rounded border-b border-gray-800 px-4 py-3"
    >
      <div className="flex justify-between text-gray-600">
        <div className="flex gap-2">
          <div>
            <Image
              src={logoUrl}
              alt={tickerSymbol}
              width={24}
              height={24}
              unoptimized
            />
          </div>
          <div>{tickerSymbol}</div>
          <div>{balance}</div>
        </div>
        <div>~${(+balance * +price)?.toFixed(2)}</div>
      </div>
    </div>
  );
};

const NFTRow = ({
  price,
  tickerSymbol,
  tokenId,
  tokenUrl,
  contractAddress,
}: Omit<
  NFTToken,
  "decimals" | "amount" | "supportedERCStandards" | "logoUrl"
>) => {
  return (
    <div
      key={tickerSymbol}
      className="rounded border-b border-gray-800 px-4 py-3"
    >
      <div className="flex items-center justify-between text-gray-600">
        <div className="flex items-center gap-2">
          <div>
            <Image
              blurDataURL={tokenUrl}
              src={tokenUrl ?? "/app_icon.svg"}
              alt={tickerSymbol}
              width={24}
              height={24}
              unoptimized
            />
          </div>
          <div className="flex flex-col text-xs md:text-sm">
            <div className="text-gray-200">{tickerSymbol}</div>
            <div className="flex gap-2">
              <div className="rounded bg-gray-600 px-0.5 text-gray-400">
                #{tokenId}
              </div>
              <div>{minifyAddress(contractAddress)}</div>
            </div>
          </div>
        </div>
        <div>~${(+price)?.toFixed(2)}</div>
      </div>
    </div>
  );
};

const TabTrigger = ({
  value,
  title,
  count,
}: {
  value: "nfts" | "tokens";
  title: string;
  count: number;
}) => {
  return (
    <TabsTrigger value={value} className="">
      <div>{title}</div>
      <span className="ml-1 rounded bg-gray-300 px-1 text-sm leading-4 text-gray-1000">
        {count}
      </span>
    </TabsTrigger>
  );
};

const ErrorFallback = () => {
  return (
    <div className="flex h-full items-center justify-center text-gray-300">
      Error fetching tokens
    </div>
  );
};
