import { NFTToken, Token } from "@/types";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command";
import Image from "next/image";
import { isNFT } from "@/libs/utils";
import { minifyAddress } from "@/libs/utils/checkUserId";
import { ScrollArea } from "./ui/scroll-area";

export function SelectTokenDropdown({
  tokens,
  onTokenSelect,
  title,
}: {
  tokens: Token[] | NFTToken[];
  onTokenSelect: (token: Token | NFTToken) => void;
  title: string;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="mt-2 w-full justify-center border-none bg-gray-850 text-gray-600 hover:bg-gray-850/80 hover:text-gray-600/80"
        >
          <PlusIcon className="mx-2" />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="relative bottom-8 max-h-48 w-full bg-gray-900 p-0 sm:w-96 md:w-[600px]">
        <Command className="w-80 bg-gray-900 text-gray-100 sm:w-full">
          <CommandInput placeholder="Search for tokens..." />
          <CommandEmpty>No tokens found.</CommandEmpty>
          <ScrollArea>
            <CommandGroup className="bg-gray-900">
              {tokens?.map((token) =>
                !isNFT(token) ? (
                  <TokenItem
                    key={token.tickerSymbol}
                    token={token}
                    onSelect={() => {
                      onTokenSelect(token);
                      setOpen(false);
                    }}
                  />
                ) : (
                  <NftCommandItem
                    key={token.tickerSymbol}
                    token={token}
                    onSelect={() => {
                      onTokenSelect(token);
                      setOpen(false);
                    }}
                  />
                ),
              )}
            </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const NftCommandItem = ({
  token,
  onSelect,
}: {
  token: NFTToken;
  onSelect: () => void;
}) => {
  return (
    <CommandItem
      key={token.tickerSymbol}
      value={token.tickerSymbol}
      className="flex w-full items-center justify-between bg-gray-900 text-gray-300 aria-selected:text-gray-100"
      onSelect={onSelect}
    >
      <NftItem token={token} />
    </CommandItem>
  );
};

export const NftItem = ({ token }: { token: NFTToken }) => {
  return (
    <div className="flex w-full flex-1 justify-between rounded-xl bg-gray-800 px-2 py-1.5">
      <div className="flex gap-2">
        <Image
          src={token.tokenUrl ?? "/app_icon.svg"}
          alt={token.tickerSymbol}
          width={24}
          height={24}
          unoptimized
        />
        <div className="flex flex-col items-start md:flex-row md:items-center md:gap-2">
          <div>{token.tickerSymbol}</div>
          <div className="rounded-md  bg-gray-700 text-gray-400">
            #{token.tokenId}
          </div>
        </div>
      </div>
      <div className="flex-col gap-1 text-gray-500 md:flex-row">
        <div>{minifyAddress(token.contractAddress)}</div>
      </div>
    </div>
  );
};

const TokenItem = ({
  token,
  onSelect,
}: {
  token: Token;
  onSelect: () => void;
}) => {
  return (
    <CommandItem
      key={token.tickerSymbol}
      value={token.tickerSymbol}
      className="flex w-full items-center justify-between bg-gray-900 text-gray-300 aria-selected:text-gray-100 "
      onSelect={onSelect}
    >
      <div className="flex w-full flex-1 justify-between rounded-xl bg-gray-800 px-2 py-1.5">
        <div className="flex gap-2">
          <Image
            src={token.logoUrl}
            alt={token.tickerSymbol}
            width={24}
            height={24}
            unoptimized
          />
          <div>{token.tickerSymbol}</div>
        </div>
        <div className="flex-col gap-1 md:flex-row">
          <div className="text-gray-100">{token.balance}</div>
        </div>
      </div>
    </CommandItem>
  );
};
