import { create } from "zustand";

export type DialogId = "successDialog" | "sendDialog";

interface DialogProps {
  openedModals: Record<DialogId, boolean>;
  modalIds: DialogId[];
  actions: {
    open: (id: DialogId) => void;
    close: (id: DialogId) => void;
  };
}

export const useDialogStore = create<DialogProps>((set) => ({
  modalIds: ["successDialog", "sendDialog"],
  openedModals: { successDialog: false, sendDialog: false },
  actions: {
    open: (id: DialogId) =>
      set((prev) => ({ openedModals: { ...prev.openedModals, [id]: true } })),
    close: (id: DialogId) =>
      set((prev) => ({ openedModals: { ...prev.openedModals, [id]: false } })),
  },
}));

export const useDialogIsOpen = (id: DialogId) =>
  useDialogStore((state) => state.openedModals[id]);

export const useDialogActions = () => useDialogStore((state) => state.actions);
