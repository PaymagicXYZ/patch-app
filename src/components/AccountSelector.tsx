"use client";
import React, { useEffect, useContext } from "react";
import type { UserId } from "@patchwallet/patch-sdk";
import { useRouter, usePathname } from "next/navigation";
import isUserId from "@/utils/checkUserId";
import { UserContext } from "@/context/user-provider";
import { isSupportedChain } from "@/utils/chain";

const AccountSelector = ({
  userAddressMap,
}: {
  userAddressMap: Record<string, string>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, setSelectedAddress, selectedAddress, user, chain } =
    useContext(UserContext);

  useEffect(() => {
    if (!user) {
      const userIds = Object.keys(userAddressMap);
      const _defaultUser = userIds[userIds.length - 1] as UserId;
      setUser(_defaultUser);
      setSelectedAddress(userAddressMap[_defaultUser]);
    }
  }, [userAddressMap, setUser, setSelectedAddress]);

  // useEffect(() => {
  //   const _user = pathname.split("/")[1];
  //   const _chain = pathname.split("/")[2] || "";
  //   if (isUserId(_user) && isSupportedChain(_chain)) {
  //     // setUser(_user);
  //     // setSelectedAddress(userAddressMap[_user]);
  //     router.replace(`/${_user}/${_chain}`);
  //   }
  // }, [chain]);

  return (
    <div>
      <select
        value={user}
        onChange={(e) => {
          const _userId = e.target.value as UserId;
          setUser(_userId);
          setSelectedAddress(userAddressMap[_userId]);
          router.push(`/${e.target.value}/${chain}`);
        }}
      >
        <option value="" disabled>
          Select a wallet
        </option>
        {Object.keys(userAddressMap).map((username, i) => (
          <option key={i} value={username}>
            {username}
          </option>
        ))}
      </select>
      {user && (
        <pre className="w-full text-xs md:text-base">{selectedAddress}</pre>
      )}
    </div>
  );
};

export default AccountSelector;
