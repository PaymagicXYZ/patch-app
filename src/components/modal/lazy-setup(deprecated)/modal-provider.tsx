"use client";
import { LazyComponent } from "@/components/modal/lazy-setup(deprecated)/LazyComponent";
import { useOpenedModals } from "@/libs/hooks/useDialog";

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
