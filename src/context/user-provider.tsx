"use client";

import { Address, Chain } from "@patchwallet/patch-sdk";
import { SetStateAction, createContext, useState } from "react";

interface UserContextType {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  chain: Chain;
  setChain: React.Dispatch<React.SetStateAction<Chain>>;
  selectedAddress: string;
  setSelectedAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<UserContextType>({
  user: "",
  setUser: function (value: SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
  chain: "matic",
  setChain: function (value: SetStateAction<Chain>): void {
    throw new Error("Function not implemented.");
  },
  selectedAddress: "",
  setSelectedAddress: function (value: SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
});

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState("");
  const [chain, setChain] = useState<Chain>("matic");
  const [selectedAddress, setSelectedAddress] = useState("");
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        chain,
        setChain,
        selectedAddress,
        setSelectedAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
