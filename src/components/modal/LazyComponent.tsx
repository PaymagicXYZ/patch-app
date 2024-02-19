"use client";
import {
  useDialogActions,
  useDialogIsOpen,
  useDialogMeta,
} from "@/libs/hooks/useDialog";
import { Suspense, lazy, useMemo } from "react";
import { DialogId } from "@/libs/hooks/useDialog";

interface ILazyComponentProps {
  filename: DialogId;
}

export function LazyComponent({ filename }: ILazyComponentProps) {
  const isOpen = useDialogIsOpen(filename);
  const { close } = useDialogActions();

  const meta = useDialogMeta(filename);

  const handleModalClose = () => {
    close(filename);
  };

  const Component = useMemo(
    () => lazy(() => import(`./${filename}/${filename}.tsx`)),
    [filename],
  );

  return (
    <Suspense fallback={null}>
      {filename ? (
        <Component isOpen={isOpen} onClose={handleModalClose} {...meta} />
      ) : null}
    </Suspense>
  );
}
