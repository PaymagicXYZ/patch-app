"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState } from "react";
import { cn, getSupportedLookupNetworks } from "@/libs/utils";
import { useSearchParams } from "next/navigation";
import { SupportedSocialNetworkIds } from "@/types/";

export function SelectSocialProvider({
  onChange,
  name,
}: {
  onChange: (value: string) => void;
  name: string;
}) {
  const searchParams = useSearchParams();
  const socialNetworks = getSupportedLookupNetworks();
  const [selectedProvider, setSelectedProvider] =
    useState<SupportedSocialNetworkIds>(
      (searchParams.get("provider")?.toString() as SupportedSocialNetworkIds) ??
        socialNetworks["twitter"].id,
    );

  const handleOnChange = (provider: SupportedSocialNetworkIds) => {
    onChange(provider);
    setSelectedProvider(provider);
  };

  return (
    <Select onValueChange={handleOnChange} defaultValue={"twitter"} name={name}>
      <SelectTrigger value={selectedProvider}>
        <SelectValue>
          <Image
            src={socialNetworks[selectedProvider].iconSrc}
            alt={socialNetworks[selectedProvider].iconAlt}
            width={24}
            height={24}
          />
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="w-40">
        <SelectGroup>
          {Object.keys(socialNetworks).map((_socialNetworkKey) => {
            const _socialNetwork =
              socialNetworks[_socialNetworkKey as SupportedSocialNetworkIds];
            return (
              <SelectItem
                key={_socialNetwork.id}
                value={_socialNetwork.id}
                className={cn(
                  "transition-all focus:rounded-lg text-gray-200 focus:bg-gray-600 py-2 radius focus:text-gray-200 active:bg-gray-800 data-[state=active]:bg-gray-800 px-2",
                  {
                    "bg-gray-800 rounded-lg":
                      _socialNetwork.id === selectedProvider,
                  },
                )}
              >
                <div className="flex items-center gap-2">
                  <Image
                    src={`/${_socialNetwork.id}.svg`}
                    width={24}
                    height={24}
                    alt={_socialNetwork.label}
                  />
                  {_socialNetwork.label}
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
