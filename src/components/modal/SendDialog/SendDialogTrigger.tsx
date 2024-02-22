"use client";

import { Button } from "@/components/ui/button";
import { useDialogActions } from "@/libs/hooks/useDialog";
import { ArrowUp } from "lucide-react";

export const SendDialogTrigger = ({
  disabled = true,
}: {
  disabled: boolean;
}) => {
  const { open } = useDialogActions();

  return (
    <Button
      className="cursor-pointer bg-orange-900 px-12 text-orange-100 hover:bg-orange-900/80"
      disabled={disabled}
      onClick={() => open("SendDialog")}
    >
      <div className="flex items-center gap-1">
        <div>Send</div>
        <ArrowUp />
      </div>
    </Button>
  );
};
