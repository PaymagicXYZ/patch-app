"use client";
import { LoadingSpinner } from "@/components/Spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useDialogActions, useDialogIsOpen } from "@/libs/hooks/useDialog";
import { cn } from "@/libs/utils";
import { Suspense } from "react";

export function SendDialog({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const isOpen = useDialogIsOpen("SendDialog");
  const { close } = useDialogActions();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => close("SendDialog")}
      modal
      defaultOpen={isOpen}
    >
      <DialogContent
        className={cn(
          "min-w-[260px] max-w-[660px] bg-gray-900 border-none flex flex-col justify-center pb-4",
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">Send</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <Separator />
        <Suspense
          fallback={
            <Skeleton className="flex h-80 w-full items-center justify-center">
              <LoadingSpinner />
            </Skeleton>
          }
        >
          {children}
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
