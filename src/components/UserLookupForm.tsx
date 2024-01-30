'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SelectSocialProvider } from "./SelectSocialProvider"
import { Input, InputProps } from "./ui/input"
import { cn, getSupportedLookupNetworks } from "@/utils";
import { Button } from "./ui/button";
import { useDebouncedCallback } from 'use-debounce';
import { useContext, useState } from "react";
import { UserContext } from "@/context/user-provider";
import { SupportedSocialNetworkIds } from "@/types";


export const SearchUser = ({className, ...props}: InputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const { chain } = useContext(UserContext);
  // Note: If the user hasn't selected a provider, it should default to 'twitter'
  const lookupProviderId = (searchParams.get("provider")?.toString() as SupportedSocialNetworkIds) ?? "twitter"
  const lookupProviderDetails = getSupportedLookupNetworks()[lookupProviderId]

  
  const handleSelect = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('provider', term);
    } else {
      params.delete('provider');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300)

  const handleOnSubmit = () => {
    const params = new URLSearchParams(searchParams);

    if (!params.get('provider')) {
        params.set('provider', 'twitter');    
    }

    const _provider = params.get('provider');
    const _user = params.get('query');

    push(`/${_provider}:${_user}/${chain}`);
  }

  const queryString = searchParams.get('query')?.toString()

    return (
      <div className="flex w-full gap-2 md:w-4/6 md:max-w-[560px]">
          <Input defaultValue={queryString} onChange={(e) => handleSearch(e.target.value)} leftButton={<SelectSocialProvider onChange={handleSelect} />} type="text" placeholder={lookupProviderDetails.placeholder} className={cn("mt-4 w-[360px] border-gray-800 bg-gray-950 focus:border-[0.5px] focus:bg-gray-1000", className)} {...props} />
          <Button onClick={handleOnSubmit} disabled={!queryString} className="rounded-lg bg-orange-100 text-gray-1000">Look up wallet</Button>
      </div>
    )
}