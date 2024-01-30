"use client"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SocialNetworkListItem } from "@/types";
import Image from "next/image";
import { useState } from "react";

import Link from "next/link"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { cn } from "@/utils";


export function SelectSocialProvider({small}: {small?: boolean}) {
    const socialNetworks: SocialNetworkListItem[] = [
        {
          id: "twitter",
          name: "Twitter",
          label: small ? "" : "Twitter",
          placeholder: small ? "Search for Twitter profile..." : "username",
          icon: <Image src="/twitter.svg" alt="twitter" width={20} height={20} />,
        },
        {
          id: "github",
          name: "Github",
          label: small ? "" : "Github",
          placeholder: small ? "Search for Github profile..." : "username",
          icon: <Image src="/github.svg" alt="github" width={20} height={20} />,
        },
        {
          id: "email",
          name: "Email",
          label: small ? "" : "Email",
          placeholder: small ? "Search for Email address..." : "email",
          icon: <Image src="/email.svg" alt="email" width={20} height={20} />,
        },
        {
          id: "tel",
          name: "Phone",
          label: small ? "" : "Phone",
          placeholder: small ? "Search for phone number..." : "phone number",
          icon: <Image src="/tel.svg" alt="phone" width={20} height={20} />,
        },
        {
          id: "passphrase",
          name: "Passphrase",
          label: small ? "" : "Passphrase",
          placeholder: small ? "Search for passphrase wallet..." : "passphrase",
          icon: (
            <Image src="/passphrase.svg" alt="passphrase" width={20} height={20} />
          ),
        },
      ];
    const [selectedProvider, setSelectedProvider] = useState<string>(socialNetworks[0].id)
    
    // const 
  return (
    <Select onValueChange={(value) => setSelectedProvider(value)} defaultValue={selectedProvider}>
      <SelectTrigger className=" border-none selection:border-none focus:border-none active:border-none" value={selectedProvider.id}>
        <SelectValue  />
      </SelectTrigger>
      <SelectContent className="w-40 border-none bg-gray-900">
        <SelectGroup>
            {socialNetworks.map((network) => {
                return <SelectItem key={network.id} value={network.id} className={cn("transition-all focus:rounded-lg text-gray-200 focus:bg-gray-600 py-2 radius focus:text-gray-200 active:bg-gray-800", {"bg-gray-800 rounded-lg": network.id === selectedProvider})}>{network.label}</SelectItem>
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

