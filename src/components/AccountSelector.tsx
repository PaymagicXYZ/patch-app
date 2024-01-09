"use client";
import React, { useState } from "react";
import type { UserId } from "@patchwallet/patch-sdk";

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
  const [selectedAccount, setSelectedAccount] = useState("");

  return (
    <div>
      <select
        value={selectedAccount}
        onChange={(e) => setSelectedAccount(e.target.value)}
      >
        {availableWallets.map((account, i) => (
          <option key={i} value={account}>
            {account}
          </option>
        ))}
      </select>
      <pre>{wallets[availableWallets.indexOf(selectedAccount as UserId)]}</pre>
      <SignBtn userId={selectedAccount as UserId} token={token} />
    </div>
  );
};

export default AccountSelector;
