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
import { supportedShortNames } from "@patchwallet/patch-sdk/utils";

const ChainSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { setChain } = useContext(UserContext);

  const handleChainChange = (value: string) => {
    setChain(value as Chain);
    const _user = pathname.split("/")[1];
    if (isUserId(_user)) {
      router.replace(`/${_user}/${value}`);
    }
  };

  return (
    <div>
      <SelectChain onValueChange={handleChainChange} />
    </div>
  );
};

export default ChainSelector;

const SelectChain = ({
  onValueChange,
}: {
  onValueChange: (value: string) => void;
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue="matic">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {supportedShortNames.map((chain, i) => {
            return (
              <SelectItem key={i} value={chain}>
                {chain}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
