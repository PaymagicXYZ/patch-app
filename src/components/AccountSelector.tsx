"use client";
import React, { useState, useEffect } from "react";
import type { UserId } from "@patchwallet/patch-sdk";
import { useRouter, usePathname } from "next/navigation";
import isUserId from "@/utils/checkUserId";

import { SignBtn } from "./SignBtn";

const AccountSelector = ({
  availableWallets,
  wallets,
  token,
}: {
  availableWallets: UserId[];
  wallets: string[];
  token: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedAccount, setSelectedAccount] = useState<UserId | "">("");
  const user = pathname.split("/")[2];
  const chain = pathname.split("/")[3] || "";
  useEffect(() => {
    if (isUserId(user) && availableWallets.lastIndexOf(user) > -1) {
      setSelectedAccount(user);
    }
  }, [availableWallets, user]);

  return (
    <div>
      <select
        value={selectedAccount}
        onChange={(e) => {
          setSelectedAccount((e.target.value as UserId) || "");
          router.push(`/user/${e.target.value}/${chain}`);
        }}
      >
        <option value="" disabled>
          Select a wallet
        </option>
        {availableWallets.map((account, i) => (
          <option key={i} value={account}>
            {account}
          </option>
        ))}
      </select>
      {selectedAccount && (
        <pre>{wallets[availableWallets.indexOf(selectedAccount)]}</pre>
      )}
    </div>
  );
};

export default AccountSelector;
