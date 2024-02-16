"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getSupportedLookupNetworks } from "@/libs/utils";
import { Button } from "./ui/button";
import { useDebouncedCallback } from "use-debounce";
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { UserContext } from "@/context/user-provider";
import { SupportedSocialNetworkIds, UserLookupBy } from "@/types";
import { useModifyQueryParams } from "@/libs/hooks/useModifyQueryParams";
import { LookupInput } from "./ui/lookup-input";

/**
 * Form to lookup a user's wallet based on query params and client-side routing e.g. in "/home" page
 */
export const UserLookupClientForm = () => {
  const searchParams = useSearchParams();
  const { push, prefetch } = useRouter();
  const { chain } = useContext(UserContext);

  // Note: If the user hasn't selected a provider, it should default to 'twitter'
  const lookupProviderId =
    (searchParams.get("provider")?.toString() as SupportedSocialNetworkIds) ??
    "twitter";
  const queryString = searchParams.get("query")?.toString() ?? "";

  const lookupProviderDetails = getSupportedLookupNetworks()[lookupProviderId];
  const { modifyQueryParams } = useModifyQueryParams();
  const [inputValue, setInputValue] = useState<string>(queryString);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    modifyQueryParamsWithDebounce("query", e.target.value);
    prefetchWithDebounce(e.target.value);
  };

  const prefetchUser = (username: string) => {
    prefetch(`/${lookupProviderId}:${username}/${chain}`);
  };

  const modifyQueryParamsWithDebounce = useDebouncedCallback(
    modifyQueryParams,
    300,
  );

  const prefetchWithDebounce = useDebouncedCallback(prefetchUser, 100);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (!params.get("provider")) {
      params.set("provider", "twitter");
    }

    const _provider = params.get("provider");

    push(`/${_provider}:${inputValue}/${chain}`);
  };

  return (
    <div className="flex sm:w-4/6 sm:max-w-[520px]">
      <form
        className="flex w-full flex-1 items-center gap-2"
        onSubmit={handleOnSubmit}
      >
        <LookupInput
          onInputChange={handleOnChange}
          onSelectChange={(value) => modifyQueryParams("provider", value)}
          defaultValue={queryString}
          placeholder={lookupProviderDetails.placeholder}
          className="w-full"
        />
        <Button
          type="submit"
          disabled={!inputValue}
          className="rounded-lg bg-orange-100 text-gray-1000"
        >
          Look up wallet
        </Button>
      </form>
    </div>
  );
};
