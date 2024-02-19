"use client";

import { cn } from "@/libs/utils";
import { minifyAddress } from "@/libs/utils/checkUserId";
import { Address } from "@patchwallet/patch-sdk";
import { Copy } from "lucide-react";
import { useState } from "react";

export const AddressTooltip = ({ address }: { address: Address }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipMsg, setToolTipMsg] = useState("Copy wallet address");
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address || "");
    setToolTipMsg("Copied!");
  };
  const handleMouseEnter = () => {
    setShowTooltip(true);
    setToolTipMsg("Copy wallet address");
  };
  return (
    <div
      className="flex space-x-1 rounded-lg border-[0.5px] border-gray-800 bg-gray-850 p-2 py-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowTooltip(false)}
      onClick={handleCopyAddress}
    >
      <p className="cursor-pointer text-gray-700">
        {minifyAddress(address || "", 4)}
      </p>
      <div>
        <Copy size={24} className="text-gray-600" />
        <div className="absolute ml-[-80px] flex w-[200px] justify-center">
          <p
            className={cn(
              "opacity-0 mt-1 rounded-lg bg-gray-800 px-3 py-2 text-xs text-gray-300 duration-200",
              {
                "opacity-100": showTooltip,
              },
            )}
          >
            {tooltipMsg}
          </p>
        </div>
      </div>
    </div>
  );
};
