"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogId, useDialogActions, useDialogIsOpen } from "@/libs/hooks/useDialog";
import { cn } from "@/libs/utils";

export function GenericDialog({
  children,
  className,
  title,
  subtitle,
  FooterComponent,
  dialogId,
  isOpen,
  onOpen,
  leftIcon,
  btnTitle,
}: {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle: string;
  FooterComponent?: React.ReactNode;
  dialogId: DialogId;
  isOpen?: boolean;
  onOpen?: () => void;
  leftIcon?: React.ReactNode;
  btnTitle: string;
}) {
  const _isOpen = useDialogIsOpen(dialogId);
  const { close, open } = useDialogActions();
  const handleOnTriggerClick = () => {
    open(dialogId);
    onOpen?.();
  };
  return (
    <Dialog
      open={isOpen ?? _isOpen}
      onOpenChange={() => close(dialogId)}
      modal
      defaultOpen={isOpen}
    >
      <Button
        className="cursor-pointer bg-orange-900 px-12 text-orange-100 hover:bg-orange-900/80"
        asChild
        onClick={handleOnTriggerClick}
      >
        <div className="flex items-center gap-1">
          {leftIcon}
          <div>{btnTitle}</div>
        </div>
      </Button>
      <DialogContent
        className={cn(
          "min-w-[260px] max-w-[660px] bg-gray-900 border-none flex flex-col justify-center pb-0",
          className,
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>{FooterComponent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
