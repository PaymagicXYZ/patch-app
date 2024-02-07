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
    <Popover open={open} onOpenChange={setOpen}>
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
      <PopoverContent className="w-full bg-gray-900 p-0 sm:w-96 md:w-[600px]">
        <Command className="bg-gray-900 text-gray-100">
          <CommandInput placeholder="Search for tokens..." />
          <CommandEmpty>No tokens found.</CommandEmpty>
          <CommandGroup className="bg-gray-900">
            {tokens?.map((token) => (
              <CommandItem
                key={token.tickerSymbol}
                value={token.tickerSymbol}
                className="flex items-center justify-between bg-gray-900 text-gray-50"
                onSelect={() => {
                  onTokenSelect(token);
                  setOpen(false);
                }}
              >
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
                <div className="text-gray-100">{token.amount}</div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
