"use client";

import { UserContext } from "@/context/user-provider";
import { cn, getSupportedLookupNetworks } from "@/libs/utils";
import { SupportedSocialNetworkIds } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { LookupInput } from "../ui/lookup-input";
import { useDebouncedCallback } from "use-debounce";

export const HeaderLookupForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchProvider, setSearchProvider] =
    useState<SupportedSocialNetworkIds>("twitter");
  const { chain } = useContext(UserContext);
  const lookupProviderDetails = getSupportedLookupNetworks()[searchProvider];
  const { prefetch } = useRouter();
  const pathname = usePathname();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    prefetchWithDebounce(e.target.value);
  };

  const prefetchUser = (username: string) => {
    prefetch(`/${searchProvider}:${username}/${chain}`);
  };

  const prefetchWithDebounce = useDebouncedCallback(prefetchUser, 100);

  const { push } = useRouter();

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    push(`/${searchProvider}:${searchValue}/${chain}`);
  };

  return (
    <form
      className={cn("flex w-full flex-1 items-center gap-2", {
        hidden: pathname === "/",
      })}
      onSubmit={handleOnSubmit}
    >
      <LookupInput
        onInputChange={handleOnChange}
        onSelectChange={(value) =>
          setSearchProvider(value as SupportedSocialNetworkIds)
        }
        placeholder={lookupProviderDetails.placeholder}
        className="w-full min-w-[260px]"
      />
    </form>
  );
};
