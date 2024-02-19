"use client";
import { useOpenedModals } from "@/libs/hooks/useDialog";
import { LazyComponent } from "@/components/modal/LazyComponent";

interface IModalProviderProps {
  children: React.ReactNode;
}

export function ModalProvider(props: IModalProviderProps) {
  const openedModals = useOpenedModals();

  return (
    <>
      {openedModals.map((filename) => (
        <LazyComponent key={filename} filename={filename} />
      ))}
      {props.children}
    </>
  );
}
