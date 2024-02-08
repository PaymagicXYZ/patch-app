"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn, getSupportedLookupNetworks } from "@/utils";
import { Button } from "./ui/button";
import { useDebouncedCallback } from "use-debounce";
import { FormEvent, use, useContext, useState } from "react";
import { UserContext } from "@/context/user-provider";
import { SupportedSocialNetworkIds, UserLookupBy } from "@/types";
import { useModifyQueryParams } from "@/hooks/useModifyQueryParams";
import { LookupInput } from "./ui/lookup-input";
import { useUserLookupBy } from "@/hooks/useUserLookupBy";
import { FormSubmissionLoader } from "./FormSubmissionLoader";

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

export const HeaderLookupForm = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchProvider, setSearchProvider] =
    useState<SupportedSocialNetworkIds>("twitter");
  const { chain } = useContext(UserContext);
  const lookupProviderDetails = getSupportedLookupNetworks()[searchProvider];
  const pathname = usePathname();

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
        onInputChange={(e) => setSearchValue(e.target.value)}
        onSelectChange={(value) =>
          setSearchProvider(value as SupportedSocialNetworkIds)
        }
        placeholder={lookupProviderDetails.placeholder}
        className="w-full min-w-[260px]"
      />
    </form>
  );
};

/**
 * Form to lookup a user's wallet based on serverside form submission e.g. in "Send" modal
 */
export const UserLookupServerForm = ({
  by = "default",
}: {
  by: UserLookupBy;
}) => {
  const { content, formAction, formRef, state } = useUserLookupBy({ by });
  const isDefault = by === "default";

  return (
    <div className="flex w-full">
      <form
        action={formAction}
        ref={formRef}
        className="relative flex flex-1 items-center"
      >
        <LookupInput
          onInputChange={content.onInputChange}
          onSelectChange={content.onInputChange}
          className={cn({ "pl-24": by !== "default" })}
          placeholder={content.placeholder}
          leftButton={
            !isDefault ? (
              <div className="flex items-center rounded-lg border-[0.5px] border-gray-800 bg-gray-900 p-2.5 py-1 text-gray-600">
                <div>{content.btnTitle}</div>
                <input type="hidden" name="provider" value={by} />
              </div>
            ) : undefined
          }
        />
        <FormSubmissionLoader className="absolute right-4 text-gray-300" />
        <p className="absolute -bottom-6 left-2 text-sm text-red-600">
          {state.errorMessage}
        </p>
      </form>
    </div>
  );
};
