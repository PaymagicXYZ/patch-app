"use client"

import { UserContext } from "@/context/user-provider";
import { cn, getSupportedLookupNetworks } from "@/libs/utils";
import { SupportedSocialNetworkIds } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useContext, useState } from "react";
import { LookupInput } from "../ui/lookup-input";

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
