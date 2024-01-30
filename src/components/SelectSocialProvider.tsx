import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import Image from "next/image";
import { useState } from "react";
import { cn, getSupportedLookupNetworks } from "@/utils";
import { useSearchParams } from "next/navigation";
import { SocialNetwork } from "@patchwallet/patch-sdk";
import { SupportedSocialNetworkIds } from '@/types/'

export function SelectSocialProvider({small, onChange}: {small?: boolean, onChange: (value: string) => void}) {
    const searchParams = useSearchParams();

    const socialNetworks =  getSupportedLookupNetworks()
    
    const [selectedProvider, setSelectedProvider] = useState<SupportedSocialNetworkIds>((searchParams.get("provider")?.toString() as SupportedSocialNetworkIds) ?? socialNetworks["twitter"].id)
    // const selected = socialNetworks[selectedProvider].iconSrc

    const handleOnChange = (provider: SupportedSocialNetworkIds) => {
        onChange(provider)
        setSelectedProvider(provider)
    }

    return (
    <Select onValueChange={handleOnChange} defaultValue={selectedProvider}>
      <SelectTrigger className="border-none selection:border-none focus:border-none active:border-none" value={selectedProvider}>
        {/* {socialLogo} */}
        <Image src={socialNetworks[selectedProvider].iconSrc} alt={socialNetworks[selectedProvider].iconAlt} width={24} height={24} />
      </SelectTrigger>
      <SelectContent className="w-40 border-none bg-gray-900">
        <SelectGroup>
            {Object.keys(socialNetworks).map((_socialNetworkKey) => {
                const _socialNetwork = socialNetworks[_socialNetworkKey as SupportedSocialNetworkIds]
                return <SelectItem key={_socialNetwork.id} value={_socialNetwork.id} className={cn("transition-all focus:rounded-lg text-gray-200 focus:bg-gray-600 py-2 radius focus:text-gray-200 active:bg-gray-800", {"bg-gray-800 rounded-lg": _socialNetwork.id === selectedProvider})}>{_socialNetwork.label}</SelectItem>
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

