"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

export default function ModalSlot({ children }: { children: React.ReactNode }) {
  const segment = useSelectedLayoutSegment("modal");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // We need this to fix the hydration error
  useEffect(() => {
    setOpen(segment === "children");
  }, [segment]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      router.back();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-[260px] max-w-[660px] bg-gray-900 border-none flex flex-col justify-center p-0 bg-gradient-to-b from-[#213409] to-black overflow-hidden">
        {children}
      </DialogContent>
    </Dialog>
  );
}
