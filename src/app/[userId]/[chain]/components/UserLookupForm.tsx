"use client";

import { FormSubmissionLoader } from "@/components/FormSubmissionLoader";
import { LookupInput } from "@/components/ui/lookup-input";
import { useUserLookupBy } from "@/libs/hooks/useUserLookupBy";
import { cn } from "@/libs/utils";
import { UserLookupBy } from "@/types";

export const UserLookupServerForm = ({
  by = "default",
}: {
  by: UserLookupBy;
}) => {
  const { content, formAction, formRef, state } = useUserLookupBy({ by });
  const isDefault = by === "default";

  return (
    <div className="flex w-full flex-col">
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
      </form>
      <p className="relative left-2 top-2 text-sm text-red-600">
        {state.errorMessage}
      </p>
    </div>
  );
};
