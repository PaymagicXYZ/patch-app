"use client";
import React, { useState, useEffect } from "react";
import type { Chain } from "@patchwallet/patch-sdk";
import { useRouter, usePathname } from "next/navigation";
import { isSupportedChain, supportedChainTags } from "@/utils/chain";

const ChainSelector = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedChain, setSelectedChain] = useState<Chain>("matic");
  const user = pathname.split("/")[2];
  const chain = pathname.split("/")[3];
  useEffect(() => {
    if (isSupportedChain(chain)) {
      setSelectedChain(chain as Chain);
    }
  }, [chain]);

  return (
    <div>
      <select
        value={selectedChain}
        onChange={(e) => {
          setSelectedChain((e.target.value as Chain) || "");
          router.push(`/user/${user}/${e.target.value}`);
        }}
      >
        <option value="" disabled>
          Select a wallet
        </option>
        {supportedChainTags.map((chain, i) => (
          <option key={i} value={chain}>
            {chain}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSelector;
