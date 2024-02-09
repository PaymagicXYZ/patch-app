"use client";
import React, { useContext } from "react";
import type { Chain } from "@patchwallet/patch-sdk";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { UserContext } from "@/context/user-provider";
import isUserId from "@/utils/checkUserId";
import {
  getChainNameFromShortName,
  supportedShortNames,
} from "@patchwallet/patch-sdk/utils";
import { capitalize, cn } from "@/utils";
import Image from "next/image";

const ChainSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setChain, chain: selectedChain } = useContext(UserContext);

  const handleChainChange = (value: string) => {
    setChain(value as Chain);
    const _user = pathname.split("/")[1];
    if (isUserId(_user)) {
      router.replace(`/${_user}/${value}`);
    }
  };

  return (
    <div>
      <SelectChain
        onValueChange={handleChainChange}
        selectedChain={selectedChain}
      />
    </div>
  );
};

export default ChainSelector;

const SelectChain = ({
  onValueChange,
  selectedChain,
}: {
  onValueChange: (value: string) => void;
  selectedChain: Chain;
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={selectedChain}>
      <SelectTrigger className="w-60 rounded-lg bg-gray-950 text-gray-300">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="px-1">
        <SelectGroup className="flex flex-col gap-2">
          {(supportedShortNames as string[]).map((chain, i) => {
            let formattedChainName: string;
            if (chain === "maticmum") {
              formattedChainName = "Mumbai";
            } else {
              formattedChainName = capitalize(
                getChainNameFromShortName(chain).split("-")[0],
              );
            }
            return (
              <SelectItem
                key={i}
                value={chain}
                className={cn("focus:bg-gray-850 text-gray-100 px-2")}
              >
                <div className="flex flex-1 items-center gap-2">
                  {/* TODO: dynamic image once we know all the chains */}
                  <Image
                    src={`/matic.svg`}
                    alt={chain}
                    width={28}
                    height={28}
                  />
                  {capitalize(formattedChainName)}
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
