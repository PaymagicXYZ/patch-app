"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn, getSupportedLookupNetworks } from "@/libs/utils";
import { Button } from "./ui/button";
import { useDebouncedCallback } from "use-debounce";
import { FormEvent, use, useContext, useState } from "react";
import { UserContext } from "@/context/user-provider";
import { SupportedSocialNetworkIds, UserLookupBy } from "@/types";
import { useModifyQueryParams } from "@/libs/hooks/useModifyQueryParams";
import { LookupInput } from "./ui/lookup-input";

/**
 * Form to lookup a user's wallet based on query params and client-side routing e.g. in "/home" page
 */
export const UserLookupClientForm = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const { chain } = useContext(UserContext);
  // Note: If the user hasn't selected a provider, it should default to 'twitter'
  const lookupProviderId =
    (searchParams.get("provider")?.toString() as SupportedSocialNetworkIds) ??
    "twitter";
  const lookupProviderDetails = getSupportedLookupNetworks()[lookupProviderId];
  const { modifyQueryParams } = useModifyQueryParams();

  const withDebounce = useDebouncedCallback(modifyQueryParams, 300);

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);

    if (!params.get("provider")) {
      params.set("provider", "twitter");
    }

    const _provider = params.get("provider");
    const _user = params.get("query");

    push(`/${_provider}:${_user}/${chain}`);
  };

  const queryString = searchParams.get("query")?.toString();

  return (
    <div className="flex sm:w-4/6 sm:max-w-[520px]">
      <form
        className="flex w-full flex-1 items-center gap-2"
        onSubmit={handleOnSubmit}
      >
        <LookupInput
          onInputChange={(e) => withDebounce("query", e.target.value)}
          onSelectChange={(value) => modifyQueryParams("provider", value)}
          defaultValue={queryString}
          placeholder={lookupProviderDetails.placeholder}
          className="w-full"
        />
        <Button
          type="submit"
          disabled={!queryString}
          className="rounded-lg bg-orange-100 text-gray-1000"
        >
          Look up wallet
        </Button>
      </form>
    </div>
  );
};
