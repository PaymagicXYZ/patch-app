"use client";
import React, { useEffect, useContext } from "react";
import type { UserId } from "@patchwallet/patch-sdk";
import { usePathname, useRouter } from "next/navigation";
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
import isUserId from "@/utils/checkUserId";

const AccountSelector = ({
  userAddressMap,
}: {
  userAddressMap: Record<string, string>;
}) => {
  const router = useRouter();
  const { setUser, setSelectedAddress, user, chain } = useContext(UserContext);
  const pathname = usePathname();

  useEffect(() => {
    // Note: User's wallet shouldn't be set on the home page
    if (pathname === "/") {
      setUser("");
      setSelectedAddress("");
      return;
    }

    const _user = pathname.split("/")[1].toLowerCase();

    if (isUserId(_user) && userAddressMap[_user]) {
      setSelectedAddress(userAddressMap[_user]);
      setUser(_user);
    }
  }, [pathname, userAddressMap, setUser, setSelectedAddress]);

  const handleUserChange = (value: string) => {
    const _userId = value as UserId;
    setUser(_userId);
    setSelectedAddress(userAddressMap[_userId]);
    router.push(`/${value}/${chain}`);
  };

  return (
    <Select onValueChange={handleUserChange} value={user}>
      <SelectTrigger className="w-72 rounded-lg bg-gray-950 text-gray-300">
        <SelectValue placeholder="Select account" />
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
