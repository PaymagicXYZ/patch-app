'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { SelectSocialProvider } from "./SelectSocialProvider"
import { Input, InputProps } from "./ui/input"
import { cn } from "@/utils";
import { Button } from "./ui/button";
import { useDebouncedCallback } from 'use-debounce';
import { useContext } from "react";
import { UserContext } from "@/context/user-provider";

export const SearchUser = ({className, ...props}: InputProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { chain } = useContext(UserContext);

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

    if (!params.get('chain')) {
        params.set('chain', chain);    
    }

    const _provider = params.get('provider');
    const _user = params.get('query');

    replace(`/${_provider}:${_user}/${chain}`);
  }

    return (
        <div className="flex">
            <Input defaultValue={searchParams.get('query')?.toString()} onChange={(e) => handleSearch(e.target.value)} leftButton={<SelectSocialProvider onChange={handleSelect} />} type="text" placeholder="Enter your Twitter handle" className={cn("mt-4 w-[475px] border border-background-700 bg-gray-950 focus:border focus:bg-gray-1000", className)} {...props} />
            <Button onClick={handleOnSubmit}>Look up wallet</Button>
        </div>
    )
}