import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { SocialNetworkListItem } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/utils";
import { useSearchParams } from "next/navigation";
import { SocialNetwork } from "@patchwallet/patch-sdk";

type FilteredSocialNetworks = Exclude<SocialNetwork, "discord">

export function SelectSocialProvider({small, onChange}: {small?: boolean, onChange: (value: string) => void}) {
    const searchParams = useSearchParams();

    const socialNetworks: Record<FilteredSocialNetworks, SocialNetworkListItem> = {
        "twitter": {
          id: "twitter",
          name: "Twitter",
          label: small ? "" : "Twitter",
          placeholder: small ? "Search for Twitter profile..." : "username",
          icon: <Image src="/twitter.svg" alt="twitter" width={24} height={24} />,
        },
        "github": {
          id: "github",
          name: "Github",
          label: small ? "" : "Github",
          placeholder: small ? "Search for Github profile..." : "username",
          icon: <Image src="/github.svg" alt="github" width={24} height={24} />,
        },
        "email": {
          id: "email",
          name: "Email",
          label: small ? "" : "Email",
          placeholder: small ? "Search for Email address..." : "email",
          icon: <Image src="/email.svg" alt="email" width={24} height={24} />,
        },
        "tel": {
          id: "tel",
          name: "Phone",
          label: small ? "" : "Phone",
          placeholder: small ? "Search for phone number..." : "phone number",
          icon: <Image src="/phone.svg" alt="phone" width={24} height={24} />,
        },
        "passphrase": {
          id: "passphrase",
          name: "Passphrase",
          label: small ? "" : "Passphrase",
          placeholder: small ? "Search for passphrase wallet..." : "passphrase",
          icon: (
            <Image src="/passphrase.svg" alt="passphrase" width={24} height={24} />
          ),
        },
    };
    const [selectedProvider, setSelectedProvider] = useState<FilteredSocialNetworks>((searchParams.get("provider")?.toString() as FilteredSocialNetworks) ?? socialNetworks["twitter"].id)
    const socialLogo = socialNetworks[selectedProvider].icon

    const handleOnChange = (provider: FilteredSocialNetworks) => {
        onChange(provider)
        setSelectedProvider(provider)
    }

    return (
    <Select onValueChange={handleOnChange} defaultValue={selectedProvider}>
      <SelectTrigger className="border-none selection:border-none focus:border-none active:border-none" value={selectedProvider}>
        {socialLogo}
      </SelectTrigger>
      <SelectContent className="w-40 border-none bg-gray-900">
        <SelectGroup>
            {Object.keys(socialNetworks).map((_socialNetworkKey) => {
                const _socialNetwork = socialNetworks[_socialNetworkKey as FilteredSocialNetworks]
                return <SelectItem key={_socialNetwork.id} value={_socialNetwork.id} className={cn("transition-all focus:rounded-lg text-gray-200 focus:bg-gray-600 py-2 radius focus:text-gray-200 active:bg-gray-800", {"bg-gray-800 rounded-lg": _socialNetwork.id === selectedProvider})}>{_socialNetwork.label}</SelectItem>
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

