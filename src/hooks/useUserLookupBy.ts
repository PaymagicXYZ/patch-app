import { fetchUserAddress } from "@/libs/actions/utils";
import { SupportedSocialNetworkIds, UserLookupBy } from "@/types";
import { Address, UserId } from "@patchwallet/patch-sdk";
import { useEffect, useRef } from "react";
import { useFormState } from "react-dom";
import { useDebouncedCallback } from "use-debounce";
import { useSendContextStore } from "./useSendContextStore";

const initialServerFormState = {
  address: "" as UserId,
  provider: "twitter" as SupportedSocialNetworkIds,
  errorMessage: "",
};

// TODO: replace with react-hook-form implementation
export const useUserLookupBy = ({
  by = "default",
}: { by?: UserLookupBy } = {}) => {
  const setTo = useSendContextStore((state) => state.setTo);
  const formRef = useRef<HTMLFormElement>(null);
  const fireSubmitWithDebounce = useDebouncedCallback(() => {
    formRef.current?.requestSubmit();
  }, 500);

  const [state, formAction] = useFormState(
    fetchUserAddress,
    initialServerFormState,
  );

  useEffect(() => {
    setTo((state.address as Address) ?? null);
  }, [state, setTo]);

  const content = {
    address: {
      btnTitle: "Address",
      placeholder: "Enter address",
      onInputChange: fireSubmitWithDebounce,
    },
    domain: {
      btnTitle: "Domain",
      placeholder: "Enter domain",
      onInputChange: fireSubmitWithDebounce,
    },
    default: {
      btnTitle: "",
      placeholder: "Enter handle",
      onInputChange: fireSubmitWithDebounce,
    },
  };

  return {
    formRef,
    formAction,
    content: content[by],
    state,
  };
};
