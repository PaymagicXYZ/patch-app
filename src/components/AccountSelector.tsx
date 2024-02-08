"use client";
import React, { useEffect, useContext } from "react";
import type { UserId } from "@patchwallet/patch-sdk";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user-provider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { cn } from "@/utils";

const AccountSelector = ({
  userAddressMap,
}: {
  userAddressMap: Record<string, string>;
}) => {
  const router = useRouter();
  const { setUser, setSelectedAddress, selectedAddress, user, chain } =
    useContext(UserContext);

  useEffect(() => {
    if (!user) {
      const userIds = Object.keys(userAddressMap);
      const _defaultUser = userIds[userIds.length - 1] as UserId;
      setUser(_defaultUser);
      setSelectedAddress(userAddressMap[_defaultUser]);
    }
  }, [userAddressMap, setUser, setSelectedAddress, user]);

  const handleUserChange = (value: string) => {
    const _userId = value as UserId;
    setUser(_userId);
    setSelectedAddress(userAddressMap[_userId]);
    router.push(`/${value}/${chain}`);
  };

  return (
    <Select onValueChange={handleUserChange} value={user}>
      <SelectTrigger className="w-72 rounded-lg bg-gray-950">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="px-1">
        <SelectGroup className="flex flex-col gap-2">
          {Object.keys(userAddressMap).map((username, i) => {
            return (
              <SelectItem
                key={i}
                value={username}
                className={cn("focus:bg-gray-850 text-gray-100 px-2")}
              >
                {username}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AccountSelector;
