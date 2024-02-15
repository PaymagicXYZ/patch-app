"use client";
import { memo, ReactNode } from "react";
import { createPortal } from "react-dom";
import { Dialog } from "@/components/ui/dialog";

export interface IBaseModalProps {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export const BaseModal = memo(
  ({ children, isOpen, onClose }: IBaseModalProps): ReactNode => {
    const root = document.getElementById("modal");

    if (!root) throw new Error("Root node not found. Can`t render modal.");

    return createPortal(
      <Dialog open={isOpen} onOpenChange={onClose}>
        {children as ReactNode}
      </Dialog>,
      root,
    ) as any;
  },
);

BaseModal.displayName = "BaseModal";
