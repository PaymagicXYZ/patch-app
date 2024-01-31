'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SelectSocialProvider } from "./SelectSocialProvider"
import { Input, InputProps } from "./ui/input"
import { cn, getSupportedLookupNetworks } from "@/utils";
import { Button } from "./ui/button";
import { useDebouncedCallback } from 'use-debounce';
import { useContext } from "react";
import { UserContext } from "@/context/user-provider";
import { SupportedSocialNetworkIds } from "@/types";
import { useAppendQueryParams } from "@/hooks/useAppendQueryParams";


export const SearchUser = ({className, ...props}: InputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const { chain } = useContext(UserContext);
  // Note: If the user hasn't selected a provider, it should default to 'twitter'
  const lookupProviderId = (searchParams.get("provider")?.toString() as SupportedSocialNetworkIds) ?? "twitter"
  const lookupProviderDetails = getSupportedLookupNetworks()[lookupProviderId]
  const {appendQueryParams} = useAppendQueryParams()

  const handleOnQueryUpdate = (key: string, value: string) => appendQueryParams(key, value, (params) => {
    replace(`${pathname}?${params.toString()}`);
  })

  const withDebounce = useDebouncedCallback(handleOnQueryUpdate, 300)

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
      <div className="flex w-full gap-2 sm:w-4/6 sm:max-w-[520px]">
        <Input defaultValue={queryString} onChange={(e) => withDebounce("query", e.target.value)} leftButton={<SelectSocialProvider onChange={(val) => handleOnQueryUpdate("provider", val)} />} type="text" placeholder={lookupProviderDetails.placeholder} className={cn("mt-4 w-[360px] border-gray-800 bg-gray-950 focus:border-[0.5px] focus:bg-gray-1000", className)} {...props} />
        <Button onClick={handleOnSubmit} disabled={!queryString} className="rounded-lg bg-orange-100 text-gray-1000">Look up wallet</Button>
      </div>
    )
}