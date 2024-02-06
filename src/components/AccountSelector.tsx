"use client";
import React, { useState, useEffect } from "react";
import type { UserId } from "@patchwallet/patch-sdk";
import { useRouter, usePathname } from "next/navigation";
import isUserId from "@/utils/checkUserId";

const AccountSelector = ({
  availableWallets,
  wallets,
}: {
  availableWallets: UserId[];
  wallets: string[];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedAccount, setSelectedAccount] = useState<UserId | "">("");
  const user = pathname.split("/")[1];
  const chain = pathname.split("/")[2] || "";
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
          router.push(`/${e.target.value}/${chain}`);
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
        <pre className="md:text-base w-full text-xs">
          {wallets[availableWallets.indexOf(selectedAccount)]}
        </pre>
      )}
    </div>
  );
};

export default AccountSelector;
