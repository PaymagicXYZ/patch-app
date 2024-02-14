import WidgetContainer from "../../../../components/WidgetContainer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { NFTToken, Token } from "@/types";
import { Chain, UserId } from "@patchwallet/patch-sdk";
import Image from "next/image";
import { minifyAddress } from "@/libs/utils/checkUserId";
import { isNFT } from "@/libs/utils";
import { resolveSocialProfile } from "@/libs/actions/utils";
import { fetchTokenBalance } from "@/libs/actions/tokens";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUp } from "lucide-react";

export async function AssetsTab({
  chain,
  userId,
}: {
  chain: Chain;
  userId: UserId;
}) {
  const { address } = await resolveSocialProfile(userId);

  const { data, error } = (await fetchTokenBalance(address, chain, true)) ?? [];

  return (
    <WidgetContainer className="h-[416px]">
      <Tabs defaultValue="tokens" className="flex h-full flex-col gap-2">
        <TabsList className="grid w-full grid-cols-2 gap-1 bg-gray-1000">
          <TabTrigger
            count={data.tokens?.length}
            title="Tokens"
            value="tokens"
          />
          <TabTrigger count={data.nfts?.length} title="NFTs" value="nfts" />
        </TabsList>
        <ScrollArea className="flex-1 rounded-xl border border-gray-800 bg-gray-1000">
          <TabsContent value="tokens" className="mt-0">
            <Contents tokens={data.tokens} error={error} />
          </TabsContent>
          <TabsContent value="nfts" className="mt-0 ">
            <Contents tokens={data.nfts} error={error} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </WidgetContainer>
  );
}

const Contents = ({
  tokens,
  error,
}: {
  tokens: NFTToken[] | Token[];
  error: string;
}) => {
  if (error) {
    return <ErrorState />;
  }

  if (tokens.length === 0) {
    return (
      <div className="rounded-xl border border-gray-800 bg-gray-1000">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex-1 rounded-xl bg-gray-1000">
      {tokens.map((token, idx) => {
        if (isNFT(token)) {
          return (
            <NFTRow key={token.contractAddress + token.tokenId} {...token} />
          );
        }
        return (
          <TokenRow
            key={token.contractAddress + token.tickerSymbol}
            {...token}
          />
        );
      })}
    </div>
  );
};

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

const ErrorState = () => {
  return (
    <div className="absolute inset-x-0 bottom-0 top-2 flex flex-1 items-center justify-center text-gray-300">
      <div>Error fetching tokens</div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <>
      <div className="absolute inset-x-0 bottom-0 top-2 flex-1 overflow-hidden rounded-xl bg-gradient-to-t from-gray-1000">
        <div className="relative top-14 flex h-full flex-1 flex-col items-center ">
          <ArrowUp size={34} className="text-gray-300" />
          <p className="mt-4 text-[0.938rem] uppercase leading-4 text-gray-600">
            unfortunately,
          </p>
          <p className="mt-3 text-xl leading-5 text-gray-100">
            This wallet is empty for now {":("}
          </p>
        </div>
      </div>
      <div className="">
        {new Array(10).fill(placeholderToken).map((token, idx) => {
          return <TokenRow key={idx} {...token} />;
        })}
      </div>
    </>
  );
};

const placeholderToken: Token = {
  tickerSymbol: "USDT",
  balance: "0",
  logoUrl:
    "https://logos.covalenthq.com/tokens/1/0xdac17f958d2ee523a2206206994597c13d831ec7.png",
  price: "1.00",
  contractAddress: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
  decimals: 6,
};
