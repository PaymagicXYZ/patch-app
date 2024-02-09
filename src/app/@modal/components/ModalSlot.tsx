"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../../../components/ui/dialog";
import { useDialogActions } from "@/hooks/useDialog";

export default function ModalSlot({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment("modal");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { close } = useDialogActions();

  // We need this to fix the hydration error
  useEffect(() => {
    setOpen(segment === "children");
  }, [segment]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
      close("sendDialog");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex min-w-[260px] max-w-[660px] flex-col justify-center overflow-hidden border-none bg-gray-900 bg-gradient-to-b from-[#213409] to-black p-0">
        {children}
      </DialogContent>
    </Dialog>
  );
}
