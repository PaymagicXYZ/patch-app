"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/user-provider";
import { TokenBalance } from "./TokenBalance";
import { UserId } from "@patchwallet/patch-sdk";

export default function WalletDetail({ userId }: { userId?: string }) {
  const { user, chain, setUser } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      setUser(userId);
    }
  }, [setUser, userId]);
  return (
    <div>
      <h2>Wallet Detail</h2>
      <p>Wallet: {user}</p>
      {/* <TokenBalance wallet={user as UserId} chain={chain} /> */}
    </div>
  );
}
