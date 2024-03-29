"use client";
import React, { useContext, useEffect } from "react";
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
import isUserId from "@/libs/utils/checkUserId";
import {
  getChainNameFromShortName,
  isSupportedChain,
  supportedShortNames,
} from "@patchwallet/patch-sdk/utils";
import { capitalize, cn } from "@/libs/utils";
import Image from "next/image";

const ChainSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setChain, chain: selectedChain } = useContext(UserContext);

  useEffect(() => {
    if (pathname === "/") {
      return;
    }

    const [_, _user, _chain] = pathname.split("/");

    if (isSupportedChain(_chain)) {
      setChain(_chain as Chain);
    }
  }, [pathname, setChain]);

  const handleChainChange = (value: string) => {
    console.log("chain changed");
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
    <Select
      onValueChange={onValueChange}
      defaultValue={selectedChain}
      value={selectedChain}
    >
      <SelectTrigger className="w-44 rounded-lg border border-solid bg-gray-950 text-gray-300 md:w-60">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="px-1">
        <SelectGroup className="flex flex-col gap-2">
          {(supportedShortNames as string[]).map((chain, i) => {
            let formattedChainName: string;

            switch (chain) {
              case "maticmum":
                formattedChainName = "Mumbai";
                break;
              case "matic":
                formattedChainName = "Polygon";
                break;
              default:
                formattedChainName = capitalize(
                  getChainNameFromShortName(chain).split("-")[0],
                );
                break;
            }
            return (
              <SelectItem
                key={i}
                value={chain}
                className={cn("focus:bg-gray-850 text-gray-100 px-2")}
              >
                <div className="flex flex-1 items-center gap-2">
                  <Image
                    src={`/${chain}.svg`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "/eth.svg";
                    }}
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
