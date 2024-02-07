"use client";
import React, { useEffect, useContext } from "react";
import type { UserId } from "@patchwallet/patch-sdk";
import { useRouter, usePathname } from "next/navigation";
import isUserId from "@/utils/checkUserId";
import { UserContext } from "@/context/user-provider";

const AccountSelector = ({
  userAddressMap,
}: {
  userAddressMap: Record<string, string>;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, setSelectedAddress, selectedAddress } =
    useContext(UserContext);
  const user = pathname.split("/")[1];
  const chain = pathname.split("/")[2] || "";

  useEffect(() => {
    if (isUserId(user) && userAddressMap[user]) {
      setUser(user);
      setSelectedAddress(userAddressMap[user]);
    }
  }, [userAddressMap, user, setSelectedAddress, setUser]);

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
